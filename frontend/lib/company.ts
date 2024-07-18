import { SelectItem } from '@/types/common';

const companySize: SelectItem[] = [
  { label: 'Just me', value: 'JUST__ME' },
  { label: '1 - 5', value: 'ONE__TO__FIVE' },
  { label: '6 - 10', value: 'SIX__TO__TEN' },
  { label: '11 - 20', value: 'ELEVEN__TO__TWENTY' },
  { label: '21 - 50', value: 'TWENTY_ONE__TO__FIFTY' },
  { label: '51 - 100', value: 'FIFTY_ONE__TO__HUNDRED' },
  { label: '101 - 500', value: 'ONE_HUNDRED_ONE__TO__FIVE_HUNDRED' },
  { label: '501 - 1000', value: 'FIVE_HUNDRED_ONE__TO__ONE_THOUSAND' },
  { label: '1001 - 2000', value: 'ONE_THOUSAND_ONE__TO__TWO_THOUSAND' },
  { label: '2000+', value: 'TWO_THOUSAN_PLUS' },
];

export { companySize };
