import { SqliteTrackRepository } from "@repositories/sqlite-track.repository";

export class IncrementPlayCountUseCase {
  constructor(private trackRepo: SqliteTrackRepository) {}

  async execute(trackId: string): Promise<void> {
    await this.trackRepo.incrementPlayCount(trackId);
  }
}