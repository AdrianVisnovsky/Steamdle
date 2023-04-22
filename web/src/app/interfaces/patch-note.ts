import { PatchNoteKey } from "./patch-note-key";

export interface PatchNote {
    day: Date;
    version: string;
    description: string;
    keys: PatchNoteKey[];
}
