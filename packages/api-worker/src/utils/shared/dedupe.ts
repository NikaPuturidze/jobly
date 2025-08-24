import crypto from 'crypto'
import { IFormat } from './format.interface'

export default function identityKey(vacancy: IFormat, companyId: number | null) {
  return crypto
    .createHash('sha256')
    .update(
      [
        vacancy.title?.toLowerCase().trim(),
        companyId ?? 0,
        vacancy.salaryFrom ?? '-',
        vacancy.salaryTo ?? '-',
        vacancy.salaryPeriodId ?? '-',
        vacancy.salaryTypeId ?? '-',
        vacancy.locationCity ?? '-',
        vacancy.locationCountry ?? '-',
        vacancy.categoryId ?? '-',
        vacancy.jobTypeId ?? '-',
      ].join('|')
    )
    .digest('hex')
}
