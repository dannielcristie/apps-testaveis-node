import { getFutureDate } from './../tests/utils/get-future-date';
import { Appointment } from './../entities/appointment';
import { CreateAppointement } from './create-appointment';
import { describe, expect, it } from 'vitest'

describe('Create a appointment', () => {
  it('should be able to create an appointment', () => {
    const createAppointement = new CreateAppointement
    const startsAt = getFutureDate('2022-08-19')
    const endsAt = getFutureDate('2022-08-20')

    expect(createAppointement.execute({
      customer: 'John doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  });
});

