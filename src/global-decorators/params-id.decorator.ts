import { Param, ParseIntPipe } from '@nestjs/common';

export const ParseParamsId = () => Param('id', ParseIntPipe);
