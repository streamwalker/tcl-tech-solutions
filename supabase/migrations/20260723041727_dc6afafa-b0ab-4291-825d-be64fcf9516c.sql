DO $$
DECLARE
  v_tech uuid := 'ebc4ff5d-d244-4589-ba11-3627473c1211';
  o1 uuid := '5eed0001-0000-4000-8000-000000000001';
  o2 uuid := '5eed0001-0000-4000-8000-000000000002';
BEGIN
  DELETE FROM public.service_order_photos   WHERE service_order_id IN (o1, o2);
  DELETE FROM public.service_order_signoffs WHERE service_order_id IN (o1, o2);

  INSERT INTO public.service_order_photos
    (service_order_id, uploaded_by, storage_path, caption, sort_order) VALUES
    (o1, v_tech, o1::text || '/seed-01-rack.jpg',     'Rack elevation — equipment bay complete',            0),
    (o1, v_tech, o1::text || '/seed-02-prewire.jpg',  'In-wall runs terminated and labelled',               1),
    (o1, v_tech, o1::text || '/seed-03-final.jpg',    'Final installation — display and in-room audio',     2),
    (o2, v_tech, o2::text || '/seed-04-progress.jpg', 'Zone runs pulled to the rack',                       0);

  INSERT INTO public.service_order_signoffs
    (service_order_id, captured_by, signer_name, signer_role, signature_path) VALUES
    (o1, v_tech, 'C. Wallace', 'Homeowner', o1::text || '/seed-signature.png');
END $$;