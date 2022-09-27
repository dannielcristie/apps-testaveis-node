import { inMemoryAppointmentsRepository } from './../repositories/in-memory/in-memory-appointments-repository';
import { getFutureDate } from './../tests/utils/get-future-date';
import { Appointment } from './../entities/appointment';
import { CreateAppointement } from './create-appointment';
import { describe, expect, it } from 'vitest'

describe('Create a appointment', () => {
  it('should be able to create an appointment', () => {
    const startsAt = getFutureDate('2022-08-19')
    const endsAt = getFutureDate('2022-08-20')

    const appointmentsRepository = new inMemoryAppointmentsRepository
    const createAppointement = new CreateAppointement(
      appointmentsRepository
    )

    expect(createAppointement.execute({
      customer: 'John doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  });

  it('should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-15')

    const appointmentsRepository = new inMemoryAppointmentsRepository
    const createAppointement = new CreateAppointement(
      appointmentsRepository
    )

    await createAppointement.execute({
      customer: 'John doe',
      startsAt,
      endsAt
    })

    expect(createAppointement.execute({
      customer: 'John doe',
      startsAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error)


    expect(createAppointement.execute({
      customer: 'John doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointement.execute({
      customer: 'John doe',
      startsAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-17')
    })).rejects.toBeInstanceOf(Error)

    expect(createAppointement.execute({
      customer: 'John doe',
      startsAt: getFutureDate('2022-08-11'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error)

  });
});

