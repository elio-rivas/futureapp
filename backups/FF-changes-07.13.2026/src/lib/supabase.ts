export async function submitLead(data: {
  parent_name: string;
  phone?: string;
  email: string;
  child_age_grade?: string;
  main_concern?: string;
  interested_service?: string;
  message?: string;
  source?: string;
  website?: string;
  form_rendered_at?: number;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-lead`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error('Submission failed');
  }
  return response.json();
}
