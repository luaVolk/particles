import 'dart:html';
import 'dart:math';
import 'dart:async';
import 'util.dart';
import 'particle.dart';

class Particles {
  /// The id of the element that will contain the particles' [canvas]
  String id;

  /// The canvas where the particles will be drawn
  CanvasElement canvas;

  /// The context of the [canvas] where the particles will be drawn
  CanvasRenderingContext2D ctx;

  /// The width of the [canvas] where the particles will be drawn
  int canvasWidth;

  /// The height of the [canvas] where the particles will be drawn
  int canvasHeight;

  num _pxratio;

  Random _rng = new Random();

  /// The configuration Map that will be used
  Map<String, dynamic> settings = {
    'particles': {
      'number': {
        'value': 100,
        'density': {
          'enable': true,
          'value_area': 800
        }
      },
      'color': {
        'value': '#fff'
      },
      'shape': {
        'type': 'circle',
        'stroke': {
          'width': 0,
          'color': '#ff0000'
        },
        'polygon': {
          'nb_sides': 5
        },
        'character': {
          'value': 'P',
          'font': 'arial',
          'style': 'normal',
          'weight': 'normal',
        },
        'image': {
          'src': 'particle.png',
          'width': 100,
          'height': 100
        }
      },
      'opacity': {
        'value': 1,
        'random': false,
        'anim': {
          'enable': false,
          'speed': 2,
          'opacity_min': 0,
          'sync': false
        }
      },
      'size': {
        'value': 10,
        'random': false,
        'anim': {
          'enable': false,
          'speed': 20,
          'size_min': 0,
          'sync': false
        }
      },
      'line_linked': {
        'enable': true,
        'distance': 100,
        'color': '#FFFFFF',
        'opacity': 1,
        'width': 1
      },
      'move': {
        'enable': true,
        'speed': 6,
        'direction': 'none',
        'random': false,
        'straight': false,
        'out_mode': 'out',
        'bounce': false,
        'parallax': false,
        'attract': {
          'enable': false,
          'rotateX': 3000,
          'rotateY': 3000
        }
      },
      'array': [],
      'tmp': {}
    },
    'interactivity': {
      'detect_on': 'canvas',
      'events': {
        'onhover': {
          'enable': true,
          'mode': 'grab'
        },
        'onclick': {
          'enable': true,
          'mode': 'push'
        },
        'resize': true
      },
      'modes': {
        'grab':{
          'distance': 100,
          'line_linked':{
            'opacity': 1
          },
          'outer_shape': {
            'enable': false,
            'type': 'inherit',
            'size': 20,
            'stroke': {
              'width': 'inherit',
              'color': 'inherit'
            },
          }
        },
        'bubble':{
          'distance': 100,
          'size': 40,
          'duration': 0.4,
          'opacity': 8,
          'speed': 3
        },
        'repulse':{
          'distance': 200,
          'strength': 100,
          'duration': 0.4
        },
        'push':{
          'particles_nb': 4
        },
        'remove':{
          'particles_nb': 2
        }
      },
      'mouse':{}
    },
    'retina_detect': false,
    'fn': {
      'interact': {},
      'modes': {},
      'vendors':{}
    },
    'tmp': {}
  };

  /// The user provided parameters Map
  Map<String, dynamic> config;

  /// The class constructor. It won't start drawing particles until [start()] is executed.
  Particles({String this.id: 'particles', Map<String, dynamic> this.config});

  /// Starts drawing particles
  Particles start() {
    _createCanvas();

    if (config != null) {
      settings = deepExtend(settings, config);
    }

      _eventsListeners();

      _start();

      return this;
  }

  void _retinaInit() {
    if (settings['retina_detect'] && window.devicePixelRatio > 1) {
      _pxratio = window.devicePixelRatio;
      settings['tmp']['retina'] = true;
    } else {
      _pxratio = 1;
      settings['tmp']['retina'] = false;
    }

    canvasWidth = canvas.offsetWidth * _pxratio;
    canvasHeight = canvas.offsetHeight * _pxratio;

    settings['particles']['size']['value'] = settings['tmp']['obj']['size_value'] * _pxratio;
    settings['particles']['size']['anim']['speed'] = settings['tmp']['obj']['size_anim_speed'] * _pxratio;
    settings['particles']['move']['speed'] = settings['tmp']['obj']['move_speed'] * _pxratio;
    settings['particles']['line_linked']['distance'] = settings['tmp']['obj']['line_linked_distance'] * _pxratio;
    settings['interactivity']['modes']['grab']['distance'] = settings['tmp']['obj']['mode_grab_distance'] * _pxratio;
    settings['interactivity']['modes']['bubble']['distance'] = settings['tmp']['obj']['mode_bubble_distance'] * _pxratio;
    settings['particles']['line_linked']['width'] = settings['tmp']['obj']['line_linked_width'] * _pxratio;
    settings['interactivity']['modes']['bubble']['size'] = settings['tmp']['obj']['mode_bubble_size'] * _pxratio;
    settings['interactivity']['modes']['repulse']['distance'] = settings['tmp']['obj']['mode_repulse_distance'] * _pxratio;

  }

  /* ---------- Particles functions - canvas ------------ */

  void _createCanvas() {
    /* no id? set the id to default id */
    if (id == null) {
      id = 'particles';
    }

    /* Particles elements */
    Element tag = document.getElementById(id);
    String canvasClass = 'particles-js-canvas-el';
    List<Node> existCanvas = tag.getElementsByClassName(canvasClass);

    /* remove canvas if exists into the Particles target tag */
    if (existCanvas.length > 0) {
      while (existCanvas.length > 0) {
        existCanvas[0].remove();
      }
    }

    /* create canvas element */
    CanvasElement canvasEl = document.createElement('canvas');
    canvasEl.className = canvasClass;

    /* set size canvas */
    canvasEl.style.width = "100%";
    canvasEl.style.height = "100%";

    /* append canvas */
    canvas = tag.append(canvasEl);

    canvas = querySelector('#$id > .particles-js-canvas-el');

    ctx = canvas.context2D;
  }

  void _canvasSize() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (settings != null && settings['interactivity']['events']['resize']) {
      window.addEventListener('resize', (_) {
          canvasWidth = canvas.offsetWidth;
          canvasHeight = canvas.offsetHeight;

          /* resize canvas */
        if (settings['tmp'].containsKey('retina') && settings['tmp']['retina']) {
            canvasWidth *= _pxratio;
            canvasHeight *= _pxratio;
          }

          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          /* repaint canvas on anim disabled */
        if (!settings['particles']['move']['enable']) {
            _particlesEmpty();
            _particlesCreate();
            _particlesDraw();
            _densityAutoParticles();
          }

        /* density particles enabled */
        _densityAutoParticles();
      });
    }
  }

  void _canvasPaint() {
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  void _canvasClear() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  /* --------- Particles functions - particles ----------- */

  void _particlesCreate() {
    for (int i = 0; i < settings['particles']['number']['value']; i++) {
      settings['particles']['array'].add(new Particle(
        settings['particles']['color'],
        settings['particles']['opacity']['value'],
        this
      ));
    }
    settings['particles']['array'].sort((a, b) => a.radius.compareTo(b.radius) as int);
  }

  void _particlesUpdate() {
    for (int i = 0; i < settings['particles']['array'].length; i++) {
      /* the particle */
      Particle p = settings['particles']['array'][i];

      /* move the particle */
      if (settings['particles']['move']['enable']) {
        double ms = settings['particles']['move']['speed'] / 2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if (settings['particles']['opacity']['anim']['enable']) {
        if (p.opacityStatus == true) {
          if (p.opacity >= settings['particles']['opacity']['value']) {
            p.opacityStatus = false;
          }
          p.opacity += p.vo;
        } else {
          if (p.opacity <= settings['particles']['opacity']['anim']['opacity_min']) {
            p.opacityStatus = true;
          }
          p.opacity -= p.vo;
        }

        if (p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if (settings['particles']['size']['anim']['enable']) {
        if (p.sizeStatus == true) {
          if (p.radius >= settings['particles']['size']['value']) {
            p.sizeStatus = false;
          }
          p.radius += p.vs;
        } else {
          if (p.radius <= settings['particles']['size']['anim']['size_min']) {
            p.sizeStatus = true;
          }
          p.radius -= p.vs;
        }

        if (p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      Map<String, num> new_pos;
      if (settings['particles']['move']['out_mode'] == 'bounce') {
        new_pos = {
          'x_left': p.radius,
          'x_right': canvasWidth,
          'y_top': p.radius,
          'y_bottom': canvasHeight
        };
      } else {
        new_pos = {
          'x_left': -p.radius,
          'x_right': canvasWidth + p.radius,
          'y_top': -p.radius,
          'y_bottom': canvasHeight + p.radius
        };
      }

      if (p.x - p.radius > canvasWidth) {
        p.x = new_pos['x_left'];
        p.y = _rng.nextDouble() * canvasHeight;
      } else if (p.x + p.radius < 0) {
        p.x = new_pos['x_right'];
        p.y = _rng.nextDouble() * canvasHeight;
      }
      if (p.y - p.radius > canvasHeight) {
        p.y = new_pos['y_top'];
        p.x = _rng.nextDouble() * canvasWidth;
      } else if (p.y + p.radius < 0) {
        p.y = new_pos['y_bottom'];
        p.x = _rng.nextDouble() * canvasWidth;
      }

      /* out of canvas modes */
      switch (settings['particles']['move']['out_mode']) {
        case 'bounce':
          if (p.x + p.radius > canvasWidth) {
            p.vx = -p.vx;
          } else if (p.x - p.radius < 0) {
            p.vx = -p.vx;
          }
          if (p.y + p.radius > canvasHeight) {
            p.vy = -p.vy;
          } else if (p.y - p.radius < 0) {
           p.vy = -p.vy;
          }
        break;
      }

      /* events */
      if (settings['interactivity']['events']['onhover']['mode'].contains('grab')) {
        _grabParticle(p);
      }

      if (settings['interactivity']['events']['onhover']['mode'].contains('bubble') ||
          settings['interactivity']['events']['onclick']['mode'].contains('bubble')) {
        _bubbleParticle(p);
      }

      if (settings['interactivity']['events']['onhover']['mode'].contains('repulse') ||
          settings['interactivity']['events']['onclick']['mode'].contains('repulse')) {
        _repulseParticle(p);
      }

      /* interaction auto between particles */
      if (settings['particles']['line_linked']['enable'] ||
          settings['particles']['move']['attract']['enable']) {
        for (int j = i + 1; j < settings['particles']['array'].length; j++) {
          Particle p2 = settings['particles']['array'][j];

          /* link particles */
          if (settings['particles']['line_linked']['enable']) {
            _linkParticles(p, p2);
          }

          /* attract particles */
          if (settings['particles']['move']['attract']['enable']) {
            _attractParticles(p, p2);
          }

          /* bounce particles */
          if (settings['particles']['move']['bounce']) {
            _bounceParticles(p, p2);
          }
        }
      }
    }
  }

  void _particlesDraw() {
    /* clear canvas */
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    /* update each particles param */
    _particlesUpdate();

    /* draw each particle */
    for (int i = 0; i < settings['particles']['array'].length; i++) {
      Particle p = settings['particles']['array'][i];
      p.draw();
    }
  }

  void _particlesEmpty() {
    settings['particles']['array'] = [];
  }

  /// Refreshes the particles' canvas. Can be used if you changed the configuration
  void particlesRefresh() {
    /* init all */
    cancelRequestAnimFrame(settings['tmp']['checkAnimFrame']);
    cancelRequestAnimFrame(_drawAnimFrame);
    settings['tmp']['source_svg'] = null;
    settings['tmp']['img_obj'] = null;
    settings['tmp']['count_svg'] = 0;
    _particlesEmpty();
    _canvasClear();

    /* restart */
   _start();
  }

  void _linkParticles(Particle p1, Particle p2) {
    num dx = p1.x - p2.x, dy = p1.y - p2.y;
    double dist = sqrt(dx * dx + dy * dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if (dist <= settings['particles']['line_linked']['distance']) {
      double opacity_line = settings['particles']['line_linked']['opacity'] -
          (dist / (1 / settings['particles']['line_linked']['opacity'])) /
              settings['particles']['line_linked']['distance'];

      if (opacity_line > 0) {
        /* style */
        Map<String, int> color_line = settings['particles']['line_linked']['color_rgb_line'];
        ctx.strokeStyle = 'rgba(${color_line['r']},${color_line['g']},${color_line['b']},$opacity_line)';
        ctx.lineWidth = settings['particles']['line_linked']['width'];

        /* path */
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  void _attractParticles(Particle p1, Particle p2) {
    /* condensed particles */
    num dx = p1.x - p2.x, dy = p1.y - p2.y;

    double dist = sqrt(dx * dx + dy * dy);

    if (dist <= settings['particles']['line_linked']['distance']) {
      double ax = dx / (settings['particles']['move']['attract']['rotateX'] * 1000),
          ay = dy / (settings['particles']['move']['attract']['rotateY'] * 1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;
    }
  }

  void _bounceParticles(Particle p1, Particle p2) {
    num dx = p1.x - p2.x, dy = p1.y - p2.y, dist_p = p1.radius + p2.radius;

    double dist = sqrt(dx * dx + dy * dy);

    if (dist <= dist_p) {
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }
  }

  /// Adds a specified amount of particles
  void pushParticles(int nb, [Map pos]) {
    settings['particles']['tmp']['pushing'] = true;

    for (int i = 0; i < nb; i++) {
      settings['particles']['array'].add(new Particle(
        settings['particles']['color'],
        settings['particles']['opacity']['value'],
        this, {
          'x': pos != null ? pos['pos_x'] : _rng.nextDouble() * canvasWidth,
          'y': pos != null ? pos['pos_y'] : _rng.nextDouble() * canvasHeight
        }
      ));
      if (i == nb - 1) {
        if (!settings['particles']['move']['enable']) {
          _particlesDraw();
        }
        settings['particles']['tmp']['pushing'] = false;
      }
    }
    settings['particles']['array'].sort((a, b) => a.radius.compareTo(b.radius) as int);
  }

  /* ---------- Particles functions - modes events ------------ */

  /// Removes a specified amount of particles
  void removeParticles(int nb) {
    settings['particles']['array'].removeRange(0, nb);
    if (!settings['particles']['move']['enable']) {
      _particlesDraw();
    }
  }

  void _bubbleParticle(Particle p) {
    double dist_mouse, time_spent, value;

    /* on hover event */
    if (settings['interactivity']['events']['onhover']['enable'] &&
        settings['interactivity']['events']['onhover']['mode'] .contains('bubble') &&
        settings['interactivity']['status'] == 'mousemove') {
      num dx_mouse = p.x - settings['interactivity']['mouse']['pos_x'],
          dy_mouse = p.y - settings['interactivity']['mouse']['pos_y'];
      dist_mouse = sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      double ratio = 1 -
          dist_mouse / settings['interactivity']['modes']['bubble']['distance'];

      init() {
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }

      /* mousemove - check ratio */
      if (dist_mouse <= settings['interactivity']['modes']['bubble']['distance']) {
        if (ratio >= 0 && settings['interactivity']['status'] == 'mousemove') {
          /* size */
          if (settings['interactivity']['modes']['bubble']['size'] != settings['particles']['size']['value']) {
            if (settings['interactivity']['modes']['bubble']['size'] > settings['particles']['size']['value']) {
              var size = p.radius + (settings['interactivity']['modes']['bubble']['size'] * ratio);
              if (size >= 0) {
                p.radius_bubble = size;
              }
            } else {
              var dif = p.radius - settings['interactivity']['modes']['bubble']['size'],
                  size = p.radius - (dif * ratio);
              if (size > 0) {
                p.radius_bubble = size;
              } else {
                p.radius_bubble = 0;
              }
            }
          }

          /* opacity */
          if (settings['interactivity']['modes']['bubble']['opacity'] != settings['particles']['opacity']['value']) {
            if (settings['interactivity']['modes']['bubble']['opacity'] > settings['particles']['opacity']['value']) {
              double opacity = settings['interactivity']['modes']['bubble'] ['opacity'] * ratio;
              if (opacity > p.opacity &&
                  opacity <= settings['interactivity']['modes']['bubble']['opacity']) {
                p.opacity_bubble = opacity;
              }
            } else {
              double opacity = p.opacity - (settings['particles']['opacity']['value'] - settings['interactivity']['modes']['bubble']['opacity']) * ratio;
              if (opacity < p.opacity &&
                  opacity >= settings['interactivity']['modes']['bubble']['opacity']) {
                p.opacity_bubble = opacity;
              }
            }
          }
        }
      } else {
        init();
      }

      /* mouseleave */
      if (settings['interactivity']['status'] == 'mouseleave') {
        init();
      }
    }

    /* on click event */
    else if (settings['interactivity']['events']['onclick']['enable'] &&
        settings['interactivity']['events']['onclick']['mode'].contains('bubble')) {
      if (settings['tmp']['bubble_clicking']) {
      var dx_mouse = p.x - settings['interactivity']['mouse']['click_pos_x'],
          dy_mouse = p.y - settings['interactivity']['mouse']['click_pos_y'];
        dist_mouse = sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);
        time_spent = (DateTime.now().millisecondsSinceEpoch - settings['interactivity']['mouse']['click_time']) / 1000;

        if (time_spent > settings['interactivity']['modes']['bubble']['duration']) {
          settings['tmp']['bubble_duration_end'] = true;
        }

        if (time_spent > settings['interactivity']['modes']['bubble']['duration'] * 2) {
          settings['tmp']['bubble_clicking'] = false;
          settings['tmp']['bubble_duration_end'] = false;
        }
      }

      void process(
        num bubble_param,
        num particles_param,
        num p_obj_bubble,
        num p_obj,
        String id,
        double dist_mouse,
        double time_spent,
        double value
      ) {
        if (bubble_param != particles_param) {
          if (!settings['tmp']['bubble_duration_end']) {
            if (dist_mouse <= settings['interactivity']['modes']['bubble']['distance']) {
              num obj;
              if (p_obj_bubble != null) {
                obj = p_obj_bubble;
              } else {
                obj = p_obj;
              }
              if (obj != bubble_param) {
                double value = p_obj - (time_spent * (p_obj - bubble_param) / settings['interactivity']['modes']['bubble'] ['duration']);
                if (id == 'size') p.radius_bubble = value;
                if (id == 'opacity') p.opacity_bubble = value;
              }
            } else {
              if (id == 'size') p.radius_bubble = null;
              if (id == 'opacity') p.opacity_bubble = null;
            }
          } else {
            if (p_obj_bubble != null) {
              double value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / settings['interactivity']['modes']['bubble'] ['duration']),
                  dif = bubble_param - value_tmp;
                  value = bubble_param + dif;
              if (id == 'size') p.radius_bubble = value;
              if (id == 'opacity') p.opacity_bubble = value;
            }
            }
          }
        }

      ;

      if (settings['tmp']['bubble_clicking']) {
        /* size */
        process(
          settings['interactivity']['modes']['bubble']['size'],
          settings['particles']['size']['value'],
          p.radius_bubble,
          p.radius,
          'size',
          dist_mouse,
          time_spent,
          value
        );
        /* opacity */
        process(
          settings['interactivity']['modes']['bubble']['opacity'],
          settings['particles']['opacity']['value'],
          p.opacity_bubble,
          p.opacity,
          'opacity',
          dist_mouse,
          time_spent,
          value
        );
      }
    }
  }

  void _repulseParticle(Particle p) {
    if (settings['interactivity']['events']['onhover']['enable'] &&
        settings['interactivity']['events']['onhover']['mode'].contains('repulse') &&
        settings['interactivity']['status'] == 'mousemove') {
      num dx_mouse = p.x - settings['interactivity']['mouse']['pos_x'],
          dy_mouse = p.y - settings['interactivity']['mouse']['pos_y'];
      double dist_mouse = sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      Map<String, double> normVec = {
        'x': dx_mouse / dist_mouse,
        'y': dy_mouse / dist_mouse
      };

      var repulseRadius = settings['interactivity']['modes']['repulse']['distance'],
          velocity = settings['interactivity']['modes']['repulse']['strength'],
          repulseFactor = clamp(
            (1 / repulseRadius) * (-1 * pow(dist_mouse / repulseRadius, 2) + 1) * repulseRadius * velocity,
            0,
            50
          );

      Map<String, double> pos = {
        'x': p.x + normVec['x'] * repulseFactor,
        'y': p.y + normVec['y'] * repulseFactor
      };

      if (settings['particles']['move']['out_mode'] == 'bounce') {
        if (pos['x'] - p.radius > 0 && pos['x'] + p.radius < canvasWidth)
          p.x = pos['x'];
        if (pos['y'] - p.radius > 0 && pos['y'] + p.radius < canvasHeight)
          p.y = pos['y'];
      } else {
        p.x = pos['x'];
        p.y = pos['y'];
      }
    } else if (settings['interactivity']['events']['onclick']['enable'] &&
        settings['interactivity']['events']['onclick']['mode']
            .contains('repulse')) {
      if (!settings['tmp']['repulse_finish'] != null &&
          settings['tmp']['repulse_finish']) {
        settings['tmp']['repulse_count']++;
        if (settings['tmp']['repulse_count'] == settings['particles']['array'].length) {
          settings['tmp']['repulse_finish'] = true;
        }
      }

      if (settings['tmp']['repulse_clicking']) {
        num repulseRadius = pow(
            settings['interactivity']['modes']['repulse']['distance'] / 6, 3);

        num dx = settings['interactivity']['mouse']['click_pos_x'] - p.x,
            dy = settings['interactivity']['mouse']['click_pos_y'] - p.y,
            d = dx * dx + dy * dy;

        double force = -repulseRadius / d * 1;

        void process() {
          double f = atan2(dy, dx);
          p.vx = force * cos(f);
          p.vy = force * sin(f);

          if (settings['particles']['move']['out_mode'] == 'bounce') {
            Map<String, double> pos = {'x': p.x + p.vx, 'y': p.y + p.vy};
            if (pos['x'] + p.radius > canvasWidth) {
              p.vx = -p.vx;
            }
            else if (pos['x'] - p.radius < 0) p.vx = -p.vx;
            if (pos['y'] + p.radius > canvasHeight) {
              p.vy = -p.vy;
            } else if (pos['y'] - p.radius < 0) {
              p.vy = -p.vy;
            }
          }
        }

        if (d <= repulseRadius) {
          process();
        }

      } else {
        if (settings['tmp']['repulse_clicking'] == false) {
          p.vx = p.vxI;
          p.vy = p.vyI;
        }
      }
    }
  }

  void _grabParticle(Particle p) {
    if (settings['interactivity']['events']['onhover']['enable'] &&
        settings['interactivity']['events']['onhover']['mode'].contains('grab') &&
        settings['interactivity']['status'] == 'mousemove') {
      num dx_mouse = p.x - settings['interactivity']['mouse']['pos_x'],
          dy_mouse = p.y - settings['interactivity']['mouse']['pos_y'],
          dist_mouse = sqrt(dx_mouse * dx_mouse + dy_mouse * dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if (dist_mouse <= settings['interactivity']['modes']['grab']['distance']) {
        double opacity_line = settings['interactivity']['modes']['grab']['line_linked']['opacity'] -
            (dist_mouse / (1 / settings['interactivity']['modes']['grab'] ['line_linked']['opacity'])) / settings['interactivity']['modes']['grab']['distance'];

        if (opacity_line > 0) {
          /* style */
          Map<String, int> color_line = settings['particles']['line_linked']['color_rgb_line'];
          ctx.strokeStyle = 'rgba(${color_line['r']},${color_line['g']},${color_line['b']},$opacity_line)';
          ctx.lineWidth = settings['particles']['line_linked']['width'];

          /* path */
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(settings['interactivity']['mouse']['pos_x'], settings['interactivity']['mouse']['pos_y']);
          ctx.stroke();
          ctx.closePath();

          if (settings['interactivity']['modes']['grab']['outer_shape']['enable']) {
            ctx.beginPath();

            String shape;
            if (settings['interactivity']['modes']['grab']['outer_shape']['type'] != 'inherit') {
              shape = settings['interactivity']['modes']['grab']['outer_shape']['type'];
            } else {
              shape = p.shape;
            }

            if (settings['interactivity']['modes']['grab']['outer_shape']['stroke']['color'] != 'inherit') {
              Map<String, int> color = hexToRgb(settings['interactivity']['modes']['grab']['outer_shape']['stroke']['color']);
              ctx.strokeStyle = 'rgba(${color['r']},${color['g']},${color['b']},$opacity_line)';
            }

            if (settings['interactivity']['modes']['grab']['outer_shape']['stroke']['width'] != 'inherit') {
              ctx.lineWidth = settings['interactivity']['modes']['grab']['outer_shape']['stroke']['width'];
            }

            p.drawShape(shape, settings['interactivity']['modes']['grab']['outer_shape']['size'] + p.radius, true);

            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }

  void _eventsListeners() {
    /* events target element */
    if (settings['interactivity']['detect_on'] == 'window') {
      settings['interactivity']['el'] = window;
    } else {
      settings['interactivity']['el'] = canvas;
    }

    /* detect mouse pos - on hover / click event */
    if (settings['interactivity']['events']['onhover']['enable'] ||
        settings['interactivity']['events']['onclick']['enable']) {
      /* el on mousemove */
      settings['interactivity']['el'].onMouseMove.listen((MouseEvent e) {
        int pos_x = e.client.x, pos_y = e.client.y;

        if (settings['interactivity']['detect_on'] == 'window') {
          pos_x = e.client.x;
          pos_y = e.client.y;
        } else {
          pos_x = e.offset.x ?? e.client.x;
          pos_y = e.offset.y ?? e.client.y;
        }

        settings['interactivity']['mouse']['pos_x'] = pos_x;
        settings['interactivity']['mouse']['pos_y'] = pos_y;

        if (settings['tmp']['retina']) {
          settings['interactivity']['mouse']['pos_x'] *= _pxratio;
          settings['interactivity']['mouse']['pos_y'] *= _pxratio;
        }

        settings['interactivity']['status'] = 'mousemove';
      });

      /* el on onmouseleave */
      settings['interactivity']['el'].addEventListener('mouseleave', (e) {
        settings['interactivity']['mouse']['pos_x'] = null;
        settings['interactivity']['mouse']['pos_y'] = null;
        settings['interactivity']['status'] = 'mouseleave';
      });
    }

    /* on click event */
    if (settings['interactivity']['events']['onclick']['enable']) {
      settings['interactivity']['el'].addEventListener('click', (e) {
        settings['interactivity']['mouse']['click_pos_x'] = settings['interactivity']['mouse']['pos_x'];
        settings['interactivity']['mouse']['click_pos_y'] = settings['interactivity']['mouse']['pos_y'];
        settings['interactivity']['mouse']['click_time'] = DateTime.now().millisecondsSinceEpoch;

        if (settings['interactivity']['events']['onclick']['enable']) {
          switch (settings['interactivity']['events']['onclick']['mode']) {
            case 'push':
              if (settings['particles']['move']['enable']) {
                pushParticles(settings['interactivity']['modes']['push']['particles_nb'], settings['interactivity']['mouse']);
              } else {
                if (settings['interactivity']['modes']['push']['particles_nb'] == 1) {
                  pushParticles(settings['interactivity']['modes']['push']['particles_nb'], settings['interactivity']['mouse']);
                } else if (settings['interactivity']['modes']['push']['particles_nb'] > 1) {
                  pushParticles(settings['interactivity']['modes']['push']['particles_nb']);
                }
              }
            break;

            case 'remove':
              removeParticles(settings['interactivity']['modes']['remove']['particles_nb']);
            break;

            case 'bubble':
              settings['tmp']['bubble_clicking'] = true;
            break;

            case 'repulse':
              settings['tmp']['repulse_clicking'] = true;
              settings['tmp']['repulse_count'] = 0;
              settings['tmp']['repulse_finish'] = false;
              new Timer(
                new Duration(milliseconds: (settings['interactivity']['modes']['repulse']['duration'] * 1000).round()),
                () {
                  settings['tmp']['repulse_clicking'] = false;
                }
              );
            break;
          }
        }
      });
    }
  }

  void _densityAutoParticles() {
    if (settings['particles']['number']['density']['enable']) {
      /* calc area */
      double area = canvas.width * canvas.height / 1000;
      if (settings['tmp']['retina']) {
        area = area / (_pxratio * 2);
      }

      /* calc number of particles based on density area */
      int nb_particles = (area * settings['particles']['number']['value'] / settings['particles']['number']['density']['value_area']).floor();

      /* add or remove X particles */
      int missing_particles = settings['particles']['array'].length - nb_particles;
      if (missing_particles < 0) {
        pushParticles((missing_particles).abs());
      } else {
        removeParticles(missing_particles);
      }
    }
  }

  /// Stops drawing the particles and removes the [canvas]
  void destroyParticles() {
    cancelRequestAnimFrame(_drawAnimFrame);
    canvas.remove();
  }

  /// Opens the current image displaying in the [canvas] in a new tab
  void exportImg() {
    window.open(canvas.toDataUrl('image/png'), '_blank');
  }

  void _loadImg(String type) {
    settings['tmp']['img_error'] = null;

    if (settings['particles']['shape']['image']['src'] != '') {
      if (type == 'svg') {
        HttpRequest req = new HttpRequest();
        req.open('GET', settings['particles']['shape']['image']['src']);
        req.onReadyStateChange.listen((data) {
          if (req.readyState == 4) {
            if (req.status == 200) {
              settings['tmp']['source_svg'] = req.response;
              _checkBeforeDraw();
            } else {
              print('Error Particles - Image not found');
              settings['tmp']['img_error'] = true;
            }
          }
        });
        req.send();
      } else {
        ImageElement img = new ImageElement();
        img.addEventListener('load', (e) {
          settings['tmp']['img_obj'] = img;
          _checkBeforeDraw();
        });
        img.src = settings['particles']['shape']['image']['src'];
      }
    } else {
      print('Error Particles - No image.src');
      settings['tmp']['img_error'] = true;
    }
  }

  int _drawAnimFrame;

  /**
   * A function that will run every frame.
   * Meant to be replaced with another function
   */
  Function everyFrame = () {};

  void _draw([_]) {
    if (settings['particles']['shape']['type'] == 'image') {
      if (settings['tmp']['img_type'] == 'svg') {
        if (settings['tmp']['count_svg'] >=
            settings['particles']['number']['value']) {
          _particlesDraw();
          if (!settings['particles']['move']['enable']) {
            cancelRequestAnimFrame(_drawAnimFrame);
          } else {
            _drawAnimFrame = requestAnimFrame(_draw);
          }
        } else {
          if (!settings['tmp']['img_error']) {
            _drawAnimFrame = requestAnimFrame(_draw);
          }
        }
      } else {
        if (settings['tmp']['img_obj'] != null) {
          _particlesDraw();
          if (!settings['particles']['move']['enable']) {
            cancelRequestAnimFrame(_drawAnimFrame);
          } else {
            _drawAnimFrame = requestAnimFrame(_draw);
          }
        } else {
          if (!settings['tmp']['img_error']) {
            _drawAnimFrame = requestAnimFrame(_draw);
          }
        }
      }
    } else {
      _particlesDraw();
      if (!settings['particles']['move']['enable']) {
        cancelRequestAnimFrame(_drawAnimFrame);
      } else {
        _drawAnimFrame = requestAnimFrame(_draw);
      }
    }

    everyFrame();
  }

  void _checkBeforeDraw() {
    // if shape is image
    if (settings['particles']['shape']['type'] == 'image') {
      if (settings['tmp']['img_type'] == 'svg' &&
          settings['tmp']['source_svg'] == null) {
        settings['tmp']['checkAnimFrame'] = requestAnimFrame(settings['tmp']['checkAnimFrame']);
      } else {
        cancelRequestAnimFrame(settings['tmp']['checkAnimFrame']);
        if (!settings['tmp']['img_error']) {
          _init();
          _draw();
        }
      }
    } else {
      _init();
      _draw();
    }
  }

  void _init() {
    /* init canvas + particles */
    settings['particles']['line_linked']['color_rgb_line'] = hexToRgb(settings['particles']['line_linked']['color']);

    settings['tmp']['obj'] = {
      'size_value': settings['particles']['size']['value'],
      'size_anim_speed': settings['particles']['size']['anim']['speed'],
      'move_speed': settings['particles']['move']['speed'],
      'line_linked_distance': settings['particles']['line_linked']['distance'],
      'line_linked_width': settings['particles']['line_linked']['width'],
      'mode_grab_distance': settings['interactivity']['modes']['grab']['distance'],
      'mode_bubble_distance': settings['interactivity']['modes']['bubble']['distance'],
      'mode_bubble_size': settings['interactivity']['modes']['bubble']['size'],
      'mode_repulse_distance': settings['interactivity']['modes']['repulse']['distance']
    };

    _retinaInit();
    _canvasSize();
    _canvasPaint();
    _particlesCreate();
    _densityAutoParticles();
  }

  void _start() {
    if (settings['particles']['shape']['type'].contains('image')) {
      settings['tmp']['img_type'] = settings['particles']['shape']['image']['src'].substring(settings['particles']['shape']['image']['src'].length - 3);
      _loadImg(settings['tmp']['img_type']);
    } else {
      _checkBeforeDraw();
    }
  }
}
