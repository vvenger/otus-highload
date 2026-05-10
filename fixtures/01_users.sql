-- Тестовые пользователи. Пароль для всех: password
INSERT INTO users (id, password, first_name, second_name, birthdate, biography, city)
VALUES
  ('923ad426-a26c-463a-851b-1ecc782c71bc', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Alexei',    'Ivanov',    '1990-01-15 00:00:00', 'Backend developer',      'Moscow'),
  ('1909d073-e774-47e8-bbfd-362bacf4c071', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Maria',     'Petrova',   '1992-03-22 00:00:00', 'Frontend developer',     'Saint Petersburg'),
  ('51b7e160-ec0a-4809-9540-7a283224377b', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Dmitry',    'Sidorov',   '1988-07-10 00:00:00', 'DevOps engineer',        'Novosibirsk'),
  ('d1846d93-2172-405c-a036-d01b0fcf31ce', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Elena',     'Kozlova',   '1995-11-05 00:00:00', 'Data scientist',         'Yekaterinburg'),
  ('4e8129ed-1f9c-44f5-9c66-a5da6272cded', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Nikolai',   'Novikov',   '1985-04-18 00:00:00', 'System architect',       'Kazan'),
  ('3774047a-55f8-47a3-a8a0-2f436f32cd63', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Anna',      'Morozova',  '1993-09-30 00:00:00', 'Product manager',        'Nizhny Novgorod'),
  ('ce7af730-5def-4c3f-a59c-3a0925625923', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Sergei',    'Volkov',    '1987-12-01 00:00:00', 'Mobile developer',       'Chelyabinsk'),
  ('e7c83f1c-f2c5-45d6-b6a0-11317250ac71', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Olga',      'Sokolova',  '1991-06-14 00:00:00', 'QA engineer',            'Samara'),
  ('bf30aa9d-ce2c-4728-b883-f8885d943e40', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Pavel',     'Popov',     '1989-02-28 00:00:00', 'Security researcher',    'Rostov-on-Don'),
  ('8f8d3f0b-c286-497a-bc15-342acaa9e19e', '$2a$12$.y17LcfP35QE5RspzRvGKOzJvkSFOOhF3NkIN8YTY4GdWLY8o8LQq', 'Tatiana',   'Lebedeva',  '1994-08-20 00:00:00', 'ML engineer',            'Ufa')
ON CONFLICT (id) DO NOTHING;
