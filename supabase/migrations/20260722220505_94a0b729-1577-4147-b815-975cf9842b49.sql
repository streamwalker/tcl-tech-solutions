
REVOKE EXECUTE ON FUNCTION public.is_assigned_technician(uuid, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_assigned_technician(uuid, uuid) TO authenticated, service_role;
