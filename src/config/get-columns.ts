import * as termSize from 'term-size';
import {logConfig} from './config';

export const getColumns = () => termSize().columns - (process.env.NODE_ENV === 'test' ? 20 : 1) - logConfig.indent;

export const getColumnsWithBoxen = () => getColumns() - logConfig.paddingFromBoxen;
