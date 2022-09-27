import { Appointment } from './appointment';
import { expect, test } from 'vitest'


test('should create a appointment', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  endsAt.setDate(endsAt.getDate() + 1)

  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt,
    endsAt,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
});


test('should throw if appoitement end date is before start date', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  endsAt.setDate(endsAt.getDate() - 1)

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt,
    })
  }).toThrow()
})
