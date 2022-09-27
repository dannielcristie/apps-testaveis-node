import { AppointmentsRepository } from './../repositories/appointment-repository';
import { Appointment } from './../entities/appointment';

interface CreateAppointmentRequest {
  customer: string
  startsAt: Date
  endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointement {
  constructor(
    private appointmentsRepository: AppointmentsRepository
  ) { }

  async execute ({
    customer,
    startsAt,
    endsAt
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(
      startsAt,
      endsAt
    )
    
    if(overlappingAppointment){
      throw new Error('Another appointement overlaps this appointment dates')
    }


    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt
    })

    await this.appointmentsRepository.create(appointment)

    return appointment
  }
}