import { pinyin } from 'pinyin-pro';

/**
 * 拆分拼音为 [声母, 韵母]
 * @param fullPinyin 完整拼音字符串
 * @returns [initial, final]
 */
export function separatePinyin(fullPinyin: string): [string, string] {
  let initial = '';
  let final = fullPinyin;

  const initials = [
    'b', 'p', 'm', 'f', 'd', 't', 'n', 'l',
    'g', 'k', 'h', 'j', 'q', 'x',
    'zh', 'ch', 'sh', 'r', 'z', 'c', 's',
    'y', 'w'
  ];

  for (const i of initials) {
    if (fullPinyin.startsWith(i)) {
      initial = i;
      final = fullPinyin.slice(i.length);
      break;
    }
  }

  // 没有声母时，整个拼音就是韵母
  if (initial === '' && ['a', 'o', 'e', 'i', 'u', 'v'].includes(fullPinyin.charAt(0))) {
    initial = '';
    final = fullPinyin;
  }

  return [initial, final];
}

/**
 * 判断是否为汉字
 * @param char 输入字符
 */
export function isChinese(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x4E00 && code <= 0x9FFF;
}

/**
 * 获取汉字拼音，并拆分为声母和韵母
 * @param char 单个汉字
 * @returns [initial, final]
 */
export const getPinyin = (char: string): [string, string] => {
  // 使用 pinyin-pro 获取拼音，去掉音调，转小写
  const full = pinyin(char, { toneType: 'none' }).toLowerCase();

  return separatePinyin(full);
};
