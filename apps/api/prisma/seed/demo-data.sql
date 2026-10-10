-- UFO Park demo data. Paste into the Neon SQL Editor and run once.
BEGIN;
INSERT INTO "Company" ("displayName", "description", "updatedAt") VALUES ('UFO Park Demo', 'Sample garages around New York for trying out UFO Park.', NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Brooklyn Garage 1', 'Affordable parking in Brooklyn', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/create-a-cover-image-of-an-affordable-and-clean-parking-garage-in-brooklyn-new-york-the-picture-sh-825512221_kzvig6.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('456 Court St, Brooklyn, NY 11231', 40.678178, -73.944158, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BICYCLE 1', 2, 6, 2, 17, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 2', 2, 6, 2, 17, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 3', 2, 6, 2, 17, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Queens Garage 1', 'Convenient parking in Queens', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/design-a-cover-picture-for-a-convenient-parking-garage-in-queens-new-york-the-image-should-show-a--976407210_la43y2.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('789 Queens Blvd, Queens, NY 11373', 40.728224, -73.794852, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('CAR 1', 23, 13, 9, 16, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 23, 13, 9, 16, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 23, 13, 9, 16, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Manhattan Garage 2', 'Secure parking near Central Park', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716171734/autospace/design-a-cover-picture-for-a-convenient-parking-garage-in-queens-new-york-the-image-should-show-a--639233464_tuskex.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('101 Central Park West, New York, NY 10023', 40.7812, -73.9665, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BICYCLE 1', 3, 6, 2, 15, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 2', 3, 6, 2, 15, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 3', 3, 6, 2, 15, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 4', 3, 6, 2, 15, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 5', 3, 6, 2, 15, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 1', 19, 17, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 19, 17, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 19, 17, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Brooklyn Garage 2', 'Spacious parking in Brooklyn Heights', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/design-a-cover-picture-for-a-parking-garage-in-long-island-city-queens-new-york-the-image-should--184920453_v8umyi.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('202 Atlantic Ave, Brooklyn, NY 11201', 40.6912, -73.9936, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BIKE 1', 9, 6, 2, 20, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 2', 9, 6, 2, 20, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 3', 9, 6, 2, 20, 'BIKE'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Queens Garage 2', 'Safe parking in Flushing', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/create-a-cover-image-of-a-spacious-parking-garage-in-brooklyn-heights-new-york-the-picture-should--539597916_obi5kl.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('303 Main St, Flushing, NY 11354', 40.759, -73.8303, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BICYCLE 1', 3, 5, 2, 18, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 2', 3, 5, 2, 18, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 3', 3, 5, 2, 18, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 4', 3, 5, 2, 18, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 5', 3, 5, 2, 18, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 6', 3, 5, 2, 18, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 1', 6, 7, 2, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 2', 6, 7, 2, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 3', 6, 7, 2, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 4', 6, 7, 2, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 1', 18, 15, 8, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 18, 15, 8, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 18, 15, 8, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Manhattan Garage 3', 'Parking near Times Square', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/design-a-cover-picture-for-a-parking-garage-in-long-island-city-queens-new-york-the-image-should--110448605_bqjzmf.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('1515 Broadway, New York, NY 10036', 40.758, -73.9855, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BIKE 1', 5, 6, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 2', 5, 6, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 3', 5, 6, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Brooklyn Garage 3', 'Secure parking in Williamsburg', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/render-a-cover-picture-of-a-secure-parking-garage-near-central-park-in-manhattan-new-york-the-imag-736153979_kvpczt.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('404 Bedford Ave, Brooklyn, NY 11249', 40.7081, -73.9571, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('CAR 1', 20, 15, 9, 16, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 20, 15, 9, 16, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 20, 15, 9, 16, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 4', 20, 15, 9, 16, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 5', 20, 15, 9, 16, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 6', 20, 15, 9, 16, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Queens Garage 3', 'Affordable parking in Astoria', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716171733/autospace/create-a-cover-image-of-an-affordable-clean-outdoor-parking-garage-in-brooklyn-new-york-the-pict-620611113_ortr3g.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('505 Steinway St, Astoria, NY 11103', 40.7592, -73.9196, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('CAR 1', 19, 13, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 19, 13, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 19, 13, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 4', 19, 13, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 5', 19, 13, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 6', 19, 13, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Manhattan Garage 4', 'Parking near Wall Street', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158769/autospace/busy-parking-garage-with-slots-in-newyork-neon-ambiance-abstract-black-oil-gear-mecha-detailed-a_fy51wa.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('75 Wall St, New York, NY 10005', 40.7074, -74.0104, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BICYCLE 1', 2, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 2', 2, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 3', 2, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 4', 2, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 5', 2, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 1', 17, 13, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 17, 13, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 17, 13, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Brooklyn Garage 4', 'Parking near Prospect Park', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/brand-new-ultra-modern-techno-parking-garage-with-slots-showing-newyork-skyline-haze-ultra-detail_n1hhhz.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('606 Flatbush Ave, Brooklyn, NY 11225', 40.6591, -73.9626, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BICYCLE 1', 3, 5, 1, 20, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 2', 3, 5, 1, 20, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 3', 3, 5, 1, 20, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 4', 3, 5, 1, 20, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 5', 3, 5, 1, 20, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 1', 7, 7, 3, 20, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 2', 7, 7, 3, 20, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 3', 7, 7, 3, 20, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 4', 7, 7, 3, 20, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 5', 7, 7, 3, 20, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 6', 7, 7, 3, 20, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 1', 18, 18, 9, 20, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 18, 18, 9, 20, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 18, 18, 9, 20, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 4', 18, 18, 9, 20, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Queens Garage 4', 'Parking near LaGuardia Airport', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/brand-new-ultra-modern-car-parking-garage-with-slots-wide-angle-haze-ultra-detailed-film-photogr_kst6l1.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('707 Ditmars Blvd, Queens, NY 11370', 40.7743, -73.8896, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BIKE 1', 9, 8, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 2', 9, 8, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 3', 9, 8, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 4', 9, 8, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 5', 9, 8, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 6', 9, 8, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Manhattan Garage 5', 'Secure parking in the East Village', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/busy-parking-garage-near-a-newyork-central-park-acrylic-painting-trending-on-pixiv-fanbox-palette-790070610_pptabc.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('808 E 14th St, New York, NY 10009', 40.7295, -73.9786, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('CAR 1', 19, 14, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 19, 14, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 19, 14, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 4', 19, 14, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 5', 19, 14, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Brooklyn Garage 5', 'Parking in Greenpoint', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158768/autospace/brand-new-ultra-modern-techno-parking-garage-with-slots-wide-angle-haze-ultra-detailed-film-phot_ywuzvl.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('909 Manhattan Ave, Brooklyn, NY 11222', 40.7291, -73.9542, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BICYCLE 1', 3, 5, 1, 17, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 2', 3, 5, 1, 17, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 3', 3, 5, 1, 17, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 4', 3, 5, 1, 17, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 5', 3, 5, 1, 17, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 1', 9, 7, 2, 17, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 2', 9, 7, 2, 17, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 3', 9, 7, 2, 17, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 1', 17, 15, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 17, 15, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 17, 15, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Queens Garage 5', 'Convenient parking in Forest Hills', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/brand-new-ultra-modern-techno-parking-garage-with-slots-showing-newyork-skyline-low-poly-isometri_lai3r3.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('1001 Austin St, Forest Hills, NY 11375', 40.7207, -73.8448, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BICYCLE 1', 3, 5, 2, 15, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 2', 3, 5, 2, 15, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 3', 3, 5, 2, 15, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 4', 3, 5, 2, 15, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 1', 16, 15, 8, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 16, 15, 8, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 16, 15, 8, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 4', 16, 15, 8, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 5', 16, 15, 8, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 6', 16, 15, 8, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Manhattan Garage 6', 'Parking in Soho', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/brand-new-modern-techno-parking-garage-with-slots-showing-newyork-skyline-low-poly-isometric-art_rfgxgp.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('1101 Broadway, New York, NY 10012', 40.7223, -73.9987, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('HEAVY 1', 36, 25, 11, 26, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 2', 36, 25, 11, 26, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 3', 36, 25, 11, 26, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 4', 36, 25, 11, 26, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 5', 36, 25, 11, 26, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 6', 36, 25, 11, 26, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Brooklyn Garage 6', 'Parking in DUMBO', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/busy-parking-garage-with-slots-in-newyork-in-the-hudson-river-low-poly-isometric-art-3d-art-high_os8c09.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('1202 Water St, Brooklyn, NY 11201', 40.7033, -73.9903, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('CAR 1', 17, 14, 9, 18, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 17, 14, 9, 18, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 17, 14, 9, 18, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 4', 17, 14, 9, 18, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 1', 40, 30, 12, 27, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 2', 40, 30, 12, 27, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 3', 40, 30, 12, 27, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 4', 40, 30, 12, 27, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Queens Garage 6', 'Parking in Jamaica', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/brand-new-modern-techno-parking-garage-with-slots-showing-newyork-skyline-with-no-cars-low-poly-i_ikyidk.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('1303 Jamaica Ave, Jamaica, NY 11432', 40.7028, -73.7925, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BICYCLE 1', 2, 4, 1, 16, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 2', 2, 4, 1, 16, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 3', 2, 4, 1, 16, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 4', 2, 4, 1, 16, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 5', 2, 4, 1, 16, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 6', 2, 4, 1, 16, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 1', 7, 8, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 2', 7, 8, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 3', 7, 8, 3, 18, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 1', 19, 14, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 19, 14, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 19, 14, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 4', 19, 14, 9, 17, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Manhattan Garage 7', 'Parking near the UN Headquarters', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158767/autospace/busy-parking-garage-with-slots-in-newyork-outer-space-vanishing-point-super-highway-high-speed-_wnpn6u.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('1401 1st Ave, New York, NY 10016', 40.7489, -73.968, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BIKE 1', 8, 7, 2, 16, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 2', 8, 7, 2, 16, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 3', 8, 7, 2, 16, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 4', 8, 7, 2, 16, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 1', 16, 12, 9, 18, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 16, 12, 9, 18, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 16, 12, 9, 18, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 4', 16, 12, 9, 18, 'CAR'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Brooklyn Garage 7', 'Parking in Park Slope', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158766/autospace/busy-parking-garage-near-a-newyork-central-park-acrylic-painting-trending-on-pixiv-fanbox-palette_buv6ks.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('1504 7th Ave, Brooklyn, NY 11215', 40.6681, -73.9822, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BIKE 1', 6, 8, 3, 19, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 2', 6, 8, 3, 19, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 3', 6, 8, 3, 19, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 4', 6, 8, 3, 19, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 5', 6, 8, 3, 19, 'BIKE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BIKE 6', 6, 8, 3, 19, 'BIKE'::"SlotType", (SELECT id FROM g), NOW());

WITH g AS (
  INSERT INTO "Garage" ("displayName", "description", "images", "companyId", "updatedAt")
  VALUES ('Queens Garage 7', 'Parking in Long Island City', ARRAY['https://res.cloudinary.com/thankyou/image/upload/v1716158766/autospace/multistorey-parking-garage-with-slots-showing-newyork-skyline-low-poly-isometric-art-3d-art-hig_1_pbgzgi.jpg']::text[], (SELECT id FROM "Company" WHERE "displayName" = 'UFO Park Demo' ORDER BY id LIMIT 1), NOW())
  RETURNING id
), a AS (
  INSERT INTO "Address" ("address", "lat", "lng", "garageId", "updatedAt")
  VALUES ('1605 Jackson Ave, Long Island City, NY 11101', 40.7472, -73.9438, (SELECT id FROM g), NOW())
)
INSERT INTO "Slot" ("displayName", "pricePerHour", "length", "width", "height", "type", "garageId", "updatedAt")
VALUES
    ('BICYCLE 1', 4, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 2', 4, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 3', 4, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 4', 4, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('BICYCLE 5', 4, 4, 2, 19, 'BICYCLE'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 1', 16, 16, 9, 19, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 2', 16, 16, 9, 19, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 3', 16, 16, 9, 19, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('CAR 4', 16, 16, 9, 19, 'CAR'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 1', 37, 30, 18, 21, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 2', 37, 30, 18, 21, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 3', 37, 30, 18, 21, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 4', 37, 30, 18, 21, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW()),
    ('HEAVY 5', 37, 30, 18, 21, 'HEAVY'::"SlotType", (SELECT id FROM g), NOW());

COMMIT;
