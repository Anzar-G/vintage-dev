'use server';

import { headers } from 'next/headers';
import { contactSchema } from '@/lib/validations';
import { supabase } from '@/lib/supabase';
import type { InquiryPackage } from '@/types';

// Simple in-memory rate limit (per IP). In production use Upstash or similar.
const submitCounts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3;

function getClientIp(h: Headers): string {
  return (
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    h.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = submitCounts.get(ip);
  if (!entry) return true;
  if (now > entry.resetAt) {
    submitCounts.delete(ip);
    return true;
  }
  return entry.count < RATE_LIMIT_MAX;
}

function incrementRateLimit(ip: string): void {
  const now = Date.now();
  const entry = submitCounts.get(ip);
  if (!entry) {
    submitCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

function getNextInquiryNumber(): string {
  // In production, get from Supabase: SELECT COUNT(*) or max(inquiry_number)
  const pad = (n: number) => String(n).padStart(3, '0');
  const random = Math.floor(Math.random() * 900) + 100; // 100-999 for demo
  return `INQ-${pad(random)}`;
}

export async function submitInquiry(
  formData: FormData,
): Promise<{ success: boolean; message: string; inquiryNumber?: string; whatsappUrl?: string }> {
  const h = await headers();
  const ip = getClientIp(h);
  const userAgentFromHeaders = h.get('user-agent');
  if (!checkRateLimit(ip)) {
    return {
      success: false,
      message: 'Terlalu banyak pengiriman. Coba lagi dalam 1 jam.',
    };
  }

  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    whatsapp: formData.get('whatsapp') as string,
    package: formData.get('package') as InquiryPackage,
    budget_range: (formData.get('budget_range') as string) || undefined,
    description: formData.get('description') as string,
    deadline: (formData.get('deadline') as string) || undefined,
    privacy_agreed: formData.get('privacy_agreed') === 'on',
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg = Object.values(first).flat().join(', ') || 'Data tidak valid';
    return { success: false, message: msg };
  }

  const inquiryNumber = getNextInquiryNumber();
  const userAgent = userAgentFromHeaders ?? null;

  if (supabase) {
    const insertPayload = {
    inquiry_number: inquiryNumber,
    name: parsed.data.name,
    email: parsed.data.email,
    whatsapp: parsed.data.whatsapp,
    package: parsed.data.package,
    budget_range: parsed.data.budget_range ?? null,
    description: parsed.data.description,
    deadline: parsed.data.deadline || null,
    status: 'new',
    ip_address: ip !== 'unknown' ? ip : null,
    user_agent: userAgent,
    utm_source: null,
    utm_medium: null,
    utm_campaign: null,
  };
  const { error } = await supabase.from('inquiries').insert(insertPayload);

  if (error) {
      console.error('Supabase inquiry insert error:', error);
      return {
        success: false,
        message: 'Gagal menyimpan. Silakan coba lagi atau hubungi WhatsApp.',
      };
    }
  }

  incrementRateLimit(ip);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6282221025449';
  const packageLabel = { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', custom: 'Custom' }[
    parsed.data.package
  ];
  const waMessage = encodeURIComponent(
    `Halo, saya ${parsed.data.name} sudah submit inquiry ${inquiryNumber} untuk paket ${packageLabel}. Mohon info lebih lanjut ya!`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${waMessage}`;

  return {
    success: true,
    message: 'Pesan terkirim. Anda akan diarahkan ke WhatsApp.',
    inquiryNumber,
    // Client will use this to redirect
    whatsappUrl,
  };
}
