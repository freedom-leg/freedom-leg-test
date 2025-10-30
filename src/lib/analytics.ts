import { supabase } from './supabase';

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('fl-session-id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('fl-session-id', sessionId);
  }
  return sessionId;
}

export async function trackPageVisit(variant: 'modal' | 'inline') {
  try {
    const sessionId = getSessionId();

    await supabase.from('page_visits').insert({
      variant,
      session_id: sessionId,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    });
  } catch (error) {
    console.error('Error tracking page visit:', error);
  }
}

export async function trackInteraction(
  variant: 'modal' | 'inline',
  actionType: string,
  actionTarget?: string,
  actionValue?: string
) {
  try {
    const sessionId = getSessionId();

    await supabase.from('user_interactions').insert({
      session_id: sessionId,
      variant,
      action_type: actionType,
      action_target: actionTarget || null,
      action_value: actionValue || null,
    });
  } catch (error) {
    console.error('Error tracking interaction:', error);
  }
}

export async function trackConversion(
  variant: 'modal' | 'inline',
  conversionType: string,
  conversionValue?: Record<string, any>
) {
  try {
    const sessionId = getSessionId();

    await supabase.from('conversions').insert({
      session_id: sessionId,
      variant,
      conversion_type: conversionType,
      conversion_value: conversionValue || {},
    });
  } catch (error) {
    console.error('Error tracking conversion:', error);
  }
}
