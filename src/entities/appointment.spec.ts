import { Appointment } from './appointment';
import { expect, test } from 'vitest'


test('should create a appointment', () => {
  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt: new Date(),
    endsAt: new Date(),
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
});
