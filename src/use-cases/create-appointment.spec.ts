import { Appointment } from './../entities/appointment';
import { CreateAppointement } from './create-appointment';
import { describe, expect, it } from 'vitest'

describe('Create a appointment', () => {
  it('should be able to create an appointment', () => {
    const createAppointement = new CreateAppointement

    const startsAt = new Date()
    const endsAt = new Date()

    startsAt.setDate(startsAt.getDate() + 1)
    endsAt.setDate(endsAt.getDate() + 2)

    expect(createAppointement.execute({
      customer: 'John doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  });
});

