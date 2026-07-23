DO $$
DECLARE
  v_tech  uuid;
  v_admin uuid;
  o1 uuid := '5eed0001-0000-4000-8000-000000000001';
  o2 uuid := '5eed0001-0000-4000-8000-000000000002';
  o3 uuid := '5eed0001-0000-4000-8000-000000000003';
  o4 uuid := '5eed0001-0000-4000-8000-000000000004';
BEGIN
  SELECT id INTO v_tech  FROM auth.users WHERE lower(email) = 'tech.demo@tcltechsolutions.com';
  SELECT id INTO v_admin FROM auth.users WHERE lower(email) = 'admin.demo@tcltechsolutions.com';

  IF v_tech IS NULL THEN
    RAISE EXCEPTION 'Technician account not found. Create tech.demo@tcltechsolutions.com before running this script.';
  END IF;
  IF v_admin IS NULL THEN
    RAISE EXCEPTION 'Administrator account not found. Create admin.demo@tcltechsolutions.com before running this script.';
  END IF;

  UPDATE auth.users
     SET email_confirmed_at = COALESCE(email_confirmed_at, now())
   WHERE id IN (v_tech, v_admin);

  INSERT INTO public.user_roles (user_id, role)
  SELECT v_tech, 'technician'::public.app_role
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = v_tech AND role = 'technician'::public.app_role);

  INSERT INTO public.user_roles (user_id, role)
  SELECT v_admin, 'admin'::public.app_role
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = v_admin AND role = 'admin'::public.app_role);

  INSERT INTO public.service_orders
    (id, user_id, title, description, priority, status, technician, technician_id, scheduled_for, time_spent)
  VALUES
    (o1, v_admin,
     'Media room — display and in-room audio',
     'Mount 85-inch display, terminate in-wall runs, set in-room audio, calibrate, and walk the client through operation.',
     'High', 'Completed', 'Demo Technician', v_tech, CURRENT_DATE - 2, 6.5),
    (o2, v_admin,
     'Whole-home audio — second floor zones',
     'Install ceiling speakers in four upstairs zones, terminate at the rack, and commission each zone in the control app.',
     'Medium', 'In Progress', 'Demo Technician', v_tech, CURRENT_DATE, 3.0),
    (o3, v_admin,
     'Network refresh — access points and switch',
     'Replace the switch, install three access points, survey coverage, and document the addressing scheme.',
     'High', 'Open', 'Demo Technician', v_tech, CURRENT_DATE + 1, 0),
    (o4, v_admin,
     'Pre-wire — new build, low-voltage rough-in',
     'Pull low-voltage runs ahead of drywall. On hold pending the builder framing inspection.',
     'Low', 'On Hold', 'Demo Technician', v_tech, CURRENT_DATE + 6, 1.5)
  ON CONFLICT (id) DO UPDATE
    SET status        = EXCLUDED.status,
        priority      = EXCLUDED.priority,
        technician_id = EXCLUDED.technician_id,
        technician    = EXCLUDED.technician,
        scheduled_for = EXCLUDED.scheduled_for,
        time_spent    = EXCLUDED.time_spent,
        description   = EXCLUDED.description,
        title         = EXCLUDED.title;

  DELETE FROM public.service_order_checklist WHERE service_order_id IN (o1, o2, o3, o4);

  INSERT INTO public.service_order_checklist (service_order_id, user_id, item, done, sort_order) VALUES
    (o1, v_tech, 'Confirm mount height and backing with client',        true, 0),
    (o1, v_tech, 'Terminate and test in-wall HDMI run',                 true, 1),
    (o1, v_tech, 'Mount display and dress cable',                       true, 2),
    (o1, v_tech, 'Set speaker levels and distance',                     true, 3),
    (o1, v_tech, 'Calibrate picture settings',                          true, 4),
    (o1, v_tech, 'Walk client through daily operation',                 true, 5),

    (o2, v_tech, 'Locate and cut four ceiling positions',               true, 0),
    (o2, v_tech, 'Pull speaker runs to the rack',                       true, 1),
    (o2, v_tech, 'Install and secure ceiling speakers',                false, 2),
    (o2, v_tech, 'Terminate at amplifier and label',                   false, 3),
    (o2, v_tech, 'Commission each zone in the control app',            false, 4),

    (o3, v_tech, 'Photograph existing rack before changes',            false, 0),
    (o3, v_tech, 'Swap switch and restore uplinks',                    false, 1),
    (o3, v_tech, 'Mount three access points',                          false, 2),
    (o3, v_tech, 'Survey coverage on every floor',                     false, 3),
    (o3, v_tech, 'Record addressing scheme in job notes',              false, 4),

    (o4, v_tech, 'Confirm plan set against framing',                    true, 0),
    (o4, v_tech, 'Pull runs to each rough-in location',                false, 1),
    (o4, v_tech, 'Label both ends of every run',                       false, 2),
    (o4, v_tech, 'Photograph runs before drywall',                     false, 3);

  DELETE FROM public.service_order_notes WHERE service_order_id IN (o1, o2, o3, o4);

  INSERT INTO public.service_order_notes (service_order_id, author_id, body, created_at) VALUES
    (o1, v_tech, 'Arrived on site. Backing confirmed at the height the client marked.',        now() - interval '2 days 6 hours'),
    (o1, v_tech, 'In-wall HDMI tested good at 4K60. Dressed the run and closed the plate.',    now() - interval '2 days 4 hours'),
    (o1, v_tech, 'Display mounted and levelled. Speaker levels set, distances entered.',       now() - interval '2 days 2 hours'),
    (o1, v_tech, 'Calibration complete. Walked the client through sources and volume limits.', now() - interval '2 days 1 hour'),

    (o2, v_tech, 'Four ceiling positions cut and verified clear of joists.',                   now() - interval '5 hours'),
    (o2, v_tech, 'Runs pulled to the rack and labelled by zone. Speakers go in next.',         now() - interval '2 hours'),

    (o4, v_tech, 'Framing inspection not yet passed. Builder asked us to hold until Monday.',  now() - interval '3 days');

  RAISE NOTICE 'Seed complete. Technician %, administrator %.', v_tech, v_admin;
END $$;