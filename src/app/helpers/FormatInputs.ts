import * as Yup from 'yup';

export const rangeSchema = (isRequired: boolean) => {
  let schema = Yup.string()
    .trim()
    .matches(/^\d+\s*-\s*\d+$/, 'Use el formato "min-max", por ejemplo "0-50"')
    .test(
      'valid-range',
      'El rango debe ser válido y entre 0 y 5000 (ej: 0-50)',
      (value) => {
        if (!value) return !isRequired; // si no es requerido, vacío es válido

        const match = value.match(/^(\d+)\s*-\s*(\d+)$/);
        if (!match) return false;

        const min = Number(match[1]);
        const max = Number(match[2]);

        if (Number.isNaN(min) || Number.isNaN(max)) return false;
        if (min < 0 || max > 5000) return false;
        if (min > max) return false;

        return true;
      }
    );

  return isRequired ? schema.required('Required') : schema.notRequired().nullable(true);
};
