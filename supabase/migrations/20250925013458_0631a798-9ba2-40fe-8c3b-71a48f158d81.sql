-- Fix security vulnerability: Remove public access to communities table
-- and require authentication for viewing community data

-- Drop the overly permissive policy that allows anyone to view communities
DROP POLICY IF EXISTS "Anyone can view communities" ON public.communities;

-- Create a new policy that requires authentication to view communities
CREATE POLICY "Authenticated users can view communities"
ON public.communities
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

-- Optional: Create a more restrictive policy for sensitive contact information
-- This ensures only authenticated users can access developer contact details
COMMENT ON POLICY "Authenticated users can view communities" ON public.communities 
IS 'Restricts access to community data including sensitive contact information (phone, email, website_url) to authenticated users only';