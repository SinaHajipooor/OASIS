
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cahvsrockxqiafqfukpe.supabase.co'
// we can save this  api key on client because even if the user take this key , he cant do anything with it because we have enable row level security
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhaHZzcm9ja3hxaWFmcWZ1a3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyMzYzMDgsImV4cCI6MjAwOTgxMjMwOH0.tQ9N_4iA5sVTZ5KxoEd8csNScVS6vDZEMyzMbXh9III';
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase; 