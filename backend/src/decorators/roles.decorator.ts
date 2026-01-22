import { Reflector } from "@nestjs/core";
import { ERole } from "prisma/generated/enums";

export const Roles = Reflector.createDecorator<ERole[]>()