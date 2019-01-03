import 'dart:html';
import 'dart:math';
import 'util.dart';
import 'particles.dart';

class Particle {
  Particles _particles;

  Map<String, dynamic> color = {};
  Map<String, num> position;

  num opacity;
  num opacity_bubble;

  num radius;
  num radius_bubble;

  num x;
  num y;

  bool sizeStatus;
  bool opacityStatus;

  String shape;

  Map img;
  dynamic character;

  num vs;
  num vx;
  num vy;
  num vxI;
  num vyI;
  num vo;

  Random _rng = new Random();

  Particle(
    Map<String, dynamic> color, num this.opacity,
    Particles this._particles,
    [Map<String, num> this.position]
  ) {
    /* size */
    this.radius = (_particles.settings['particles']['size']['random']
            ? _rng.nextDouble()
            : 1) * _particles.settings['particles']['size']['value'];
    if (_particles.settings['particles']['size']['anim']['enable']) {
      this.sizeStatus = false;
      vs = _particles.settings['particles']['size']['anim']['speed'] / 100;
      if (!_particles.settings['particles']['size']['anim']['sync']) {
        this.vs = this.vs * _rng.nextDouble();
      }
    }

    /* position */
    this.x = position != null
        ? position['x']
        : _rng.nextDouble() * _particles.canvasWidth;
    this.y = position != null
        ? position['y']
        : _rng.nextDouble() * _particles.canvasHeight;

    /* check position  - into the canvas */
    if (this.x > _particles.canvasWidth - this.radius * 2)
      this.x = this.x - this.radius;
    else if (this.x < this.radius * 2) this.x = this.x + this.radius;
    if (this.y > _particles.canvasHeight - this.radius * 2)
      this.y = this.y - this.radius;
    else if (this.y < this.radius * 2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if (_particles.settings['particles']['move']['bounce']) {
      _checkOverlap(position);
    }

    /* color */
    if (color['value'] is List) {
      String color_selected = color['value'][(_rng.nextDouble() * _particles.settings['particles']['color']['value'].length).floor()];
      this.color['rgb'] = hexToRgb(color_selected);
    } else if (color['value'] is Map) {
      if (color['value']['r'] != null &&
          color['value']['g'] != null &&
          color['value']['b'] != null) {
        this.color['rgb'] = {
          'r': color['value']['r'],
          'g': color['value']['g'],
          'b': color['value']['b']
        };
      }
      if (color['value']['h'] != null &&
          color['value']['s'] != null &&
          color['value']['l'] != null) {
        this.color['hsl'] = {
          ['h']: color['value']['h'],
          ['s']: color['value']['s'],
          ['l']: color['value']['l']
        };
      }
    } else if (color['value'] == 'random') {
      this.color['rgb'] = {
        'r': ((_rng.nextDouble() * (255 - 0 + 1)).floor() + 0),
        'g': ((_rng.nextDouble() * (255 - 0 + 1)).floor() + 0),
        'b': ((_rng.nextDouble() * (255 - 0 + 1)).floor() + 0)
      };
    } else if (color['value'] is String) {
      // this.color = color;
      this.color['value'] = color['value'];
      this.color['rgb'] = hexToRgb(color['value']);
    }

    /* opacity */
    this.opacity = (_particles.settings['particles']['opacity']['random']
            ? _rng.nextDouble()
            : 1) *
        _particles.settings['particles']['opacity']['value'];
    if (_particles.settings['particles']['opacity']['anim']['enable']) {
      this.opacityStatus = false;
      this.vo = _particles.settings['particles']['opacity']['anim']['speed'] / 100;
      if (!_particles.settings['particles']['opacity']['anim']['sync']) {
        this.vo = this.vo * _rng.nextDouble();
      }
    }

    /* animation - velocity for speed */
    Map<String, num> velbase = {};
    switch (_particles.settings['particles']['move']['direction']) {
      case 'top':
        velbase = {'x': 0, 'y': -1};
        break;
      case 'top-right':
        velbase = {'x': 0.5, 'y': -0.5};
        break;
      case 'right':
        velbase = {'x': 1, 'y': -0};
        break;
      case 'bottom-right':
        velbase = {'x': 0.5, 'y': 0.5};
        break;
      case 'bottom':
        velbase = {'x': 0, 'y': 1};
        break;
      case 'bottom-left':
        velbase = {'x': -0.5, 'y': 1};
        break;
      case 'left':
        velbase = {'x': -1, 'y': 0};
        break;
      case 'top-left':
        velbase = {'x': -0.5, 'y': -0.5};
        break;
      default:
        velbase = {'x': 0, 'y': 0};
        break;
    }

    if (_particles.settings['particles']['move']['straight']) {
      this.vx = velbase['x'];
      this.vy = velbase['y'];

      if (_particles.settings['particles']['move']['parallax']) {
        this.vx = velbase['x'] * this.radius;
        this.vy = velbase['y'] * this.radius;
      } else if (_particles.settings['particles']['move']['random']) {
        this.vx = this.vx * (_rng.nextDouble());
        this.vy = this.vy * (_rng.nextDouble());
      }
    } else {
      if (_particles.settings['particles']['move']['parallax']) {
        this.vx = (velbase['x'] + _rng.nextInt(2) - 0.5) * this.radius;
        this.vy = (velbase['y'] + _rng.nextInt(2) - 0.5) * this.radius;
      } else {
        this.vx = velbase['x'] + _rng.nextDouble() - 0.5;
        this.vy = velbase['y'] + _rng.nextDouble() - 0.5;
      }
    }

    // var theta = 2.0 * Math.PI * _rng.nextDouble();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vxI = this.vx;
    this.vyI = this.vy;

    /* if shape is image */

    dynamic shape_type = _particles.settings['particles']['shape']['type'];
    if (shape_type is String) {
      this.shape = shape_type;
    } else {
      if (shape_type is List) {
        this.shape = shape_type[(_rng.nextDouble() * shape_type.length).floor()];
      }
    }

    if (this.shape == 'image') {
      Map<String, dynamic> sh = _particles.settings['particles']['shape'];
      this.img = {
        'src': sh['image']['src'],
        'ratio': sh['image']['width'] / sh['image']['height']
      };
      if (this.img['ratio'] == 0) this.img['ratio'] = 1;

      if (_particles.settings['particles']['tmp']['img_type'] == 'svg' &&
          _particles.settings['particles']['tmp']['source_svg'] != null) {
        _createSvgImg();
        if (_particles.settings['particles']['tmp']['pushing']) {
          this.img['loaded'] = false;
        }
      }
    } else if (this.shape == 'char' || this.shape == 'character') {
      if (_particles.settings['particles']['shape']['character']['value'] is String) {
        this.character = _particles.settings['particles']['shape']['character']['value'];
      } else {
        if (_particles.settings['particles']['shape']['character']['value'] is List) {
          this.character = _particles.settings['particles']['shape']['character']['value'][(_rng.nextDouble() *
                  _particles.settings['particles']['shape']['character']['value'].length).floor()];
        }
      }
    }
  }

  void _checkOverlap([Map<String, num> position]) {
    for (int i = 0; i < _particles.settings['particles']['array'].length; i++) {
      Particle p2 = _particles.settings['particles']['array'][i];

      num dx = this.x - p2.x, dy = this.y - p2.y;

      double dist = sqrt(dx * dx + dy * dy);

      if (dist <= this.radius + p2.radius) {
        this.x = position != null
            ? position['x']
            : _rng.nextDouble() * _particles.canvasWidth;
        this.y = position != null
            ? position['y']
            : _rng.nextDouble() * _particles.canvasHeight;
        _checkOverlap();
      }
    }
  }

  void _drawPolygon(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator) {
    int sideCount = sideCountNumerator * sideCountDenominator;
    double decimalSides = sideCountNumerator / sideCountDenominator;
    double interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    double interiorAngle = pi - pi * interiorAngleDegrees / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0, 0);
    for (int i = 0; i < sideCount; i++) {
      c.lineTo(sideLength, 0);
      c.translate(sideLength, 0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.restore();
  }

  drawShape(String shape, num radius) {
    switch (shape) {
      case 'circle':
        _particles.ctx.arc(this.x, this.y, radius, 0, pi * 2, false);
        break;

      case 'edge':
        _particles.ctx.rect(this.x - radius, this.y - radius, radius * 2, radius * 2);
        break;

      case 'triangle':
        _drawPolygon(_particles.ctx, this.x - radius, this.y + radius / 1.66, radius * 2, 3, 2);
        break;

      case 'polygon':
        _drawPolygon(
          _particles.ctx,
          this.x - radius /
                  (_particles.settings['particles']['shape']['polygon']['nb_sides'] / 3.5), // startX
          this.y - radius / (2.66 / 3.5), // startY
          radius * 2.66 /
              (_particles.settings['particles']['shape']['polygon']['nb_sides'] / 3), // sideLength
          _particles.settings['particles']['shape']['polygon']['nb_sides'], // sideCountNumerator
          1 // sideCountDenominator
        );
        break;

      case 'star':
        _drawPolygon(
          _particles.ctx,
          this.x - radius * 2 /
                  (_particles.settings['particles']['shape']['polygon']['nb_sides'] / 4), // startX
          this.y - radius / (2 * 2.66 / 3.5), // startY
          radius * 2 * 2.66 /
              (_particles.settings['particles']['shape']['polygon']['nb_sides'] / 3), // sideLength
          _particles.settings['particles']['shape']['polygon']['nb_sides'], // sideCountNumerator
          2 // sideCountDenominator
        );
        break;

      case 'char':
      case 'character':
        _particles.ctx.font = '${_particles.settings['particles']['shape']['character']['style']} ${_particles.settings['particles']['shape']['character']['weight']} ${radius * 2}px ${_particles.settings['particles']['shape']['character']['font']}';
        _particles.ctx.fillText(this.character, this.x - radius, this.y - radius);
        break;

      case 'image':
        draw(img_obj) {
          _particles.ctx.drawImageScaled(img_obj, this.x - radius,
              this.y - radius, radius * 2, radius * 2 / this.img['ratio']);
        }

        var img_obj;

        if (_particles.settings['tmp']['img_type'] == 'svg') {
          img_obj = this.img['obj'];
        } else {
          img_obj = _particles.settings['tmp']['img_obj'];
        }

        if (img_obj != null) {
          draw(img_obj);
        }

        break;
    }
  }

  void _createSvgImg() {
    /* set color to svg element */
    String svgXml = _particles.settings['tmp']['source_svg'];
    RegExp rgbHex = new RegExp(r'#([0-9A-F]{3,6})', caseSensitive: false);
    String coloredSvgXml = svgXml.replaceAllMapped(rgbHex, (m) {
      String color_value;
      if (this.color['rgb']) {
        color_value = 'rgba(${this.color['rgb']['r']},${this.color['rgb']['g']},${this.color['rgb']['b']},${this.opacity})';
      } else {
        color_value = 'hsla(${this.color['hsl']['h']},${this.color['hsl']['s']}%,${this.color['hsl']['l']}%,${this.opacity})';
      }
      return color_value;
    });

    /* prepare to create img with colored svg */
    Blob svg = new Blob([coloredSvgXml], 'image/svg+xml;charset=utf-8');
    String url = Url.createObjectUrl(svg);

    /* create particle img obj */
    ImageElement img = new ImageElement();
    img.addEventListener('load', (e) {
      this.img['obj'] = img;
      this.img['loaded'] = true;
      Url.revokeObjectUrl(url);
      _particles.settings['tmp']['count_svg']++;
    });
    img.src = url;
  }

  void draw() {
    num radius, opacity;

    String colorValue;

    if (this.radius_bubble != null) {
      radius = this.radius_bubble;
    } else {
      radius = this.radius;
    }

    if (this.opacity_bubble != null) {
      opacity = this.opacity_bubble;
    } else {
      opacity = this.opacity;
    }

    if (this.color['rgb'] != null) {
      colorValue = 'rgba(${this.color['rgb']['r']},${this.color['rgb']['g']},${this.color['rgb']['b']},$opacity)';
    } else {
      colorValue = 'hsla(${this.color['hsl']['h']},${this.color['hsl']['s']}%,${this.color['hsl']['l']}%,$opacity)';
    }

    _particles.ctx.fillStyle = colorValue;
    _particles.ctx.beginPath();

    drawShape(this.shape, radius);

    _particles.ctx.closePath();

    if (_particles.settings['particles']['shape']['stroke']['width'] > 0) {
      _particles.ctx.strokeStyle = _particles.settings['particles']['shape']['stroke']['color'];
      _particles.ctx.lineWidth = _particles.settings['particles']['shape']['stroke']['width'];
      _particles.ctx.stroke();
    }

    _particles.ctx.fill();
  }
}
