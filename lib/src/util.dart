import 'dart:html';
import 'dart:math';

Map<String, dynamic> deepExtend(Map<String, dynamic> destination, Map<String, dynamic> source) {
  Map<String, dynamic> newMap = {};
  destination.forEach((k, v) {
    if (source[k] != null) {
      if (destination[k] is Map) {
        newMap[k] = deepExtend(destination[k], source[k]);
      } else {
        newMap[k] = source[k];
      }
    } else {
      newMap[k] = v;
    }
  });

  source.forEach((k, v) {
    if (destination[k] == null) {
      newMap[k] = v;
    }
  });

  return newMap;
}

Map<String, int> hexToRgb(String hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  RegExp shorthandRegex = new RegExp(r'^#?([a-f\d])([a-f\d])([a-f\d])$', caseSensitive: false);
  hex = hex.replaceFirstMapped(shorthandRegex, (m) {
    return m[1] + m[1] + m[2] + m[2] + m[3] + m[3];
  });
  Match result = new RegExp(r'^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$', caseSensitive: false).firstMatch(hex);
  return result != null
      ? {
          'r': int.parse(result[1], radix: 16),
          'g': int.parse(result[2], radix: 16),
          'b': int.parse(result[3], radix: 16)
        }
      : null;
}

num clamp(num number, int minimum, int maximum) {
  return min(max(number, minimum), maximum);
}
