import { getFutureDate } from './../tests/utils/get-future-date';
import { Appointment } from './appointment';
import { expect, test } from 'vitest'


test('should create a appointment', () => {
  const startsAt = getFutureDate('2022-08-22')
  const endsAt = getFutureDate('2022-08-24')



  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt,
    endsAt,
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
});


test('should throw if appointment end date is before start date', () => {
  const startsAt = getFutureDate('2022-08-22')
  const endsAt = getFutureDate('2022-08-09')

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt,
    })
  }).toThrow()
})


test('should throw if appointment if  start date is before now', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt,
    })
  }).toThrow()
})
