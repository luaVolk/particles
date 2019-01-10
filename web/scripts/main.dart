import 'dart:html';
import 'dart:async';
import 'package:particles/particles.dart';

Particles particles;

main() {
  particles = new Particles().start();

  countersInit();

  settingsRefresh();

  querySelectorAll('input, select').onChange.listen((e) {
    settingsRefresh();
  });

  querySelectorAll('input, select').onKeyUp.listen((e) {
    settingsRefresh();
  });

}

countersInit() {
  Element counter = document.getElementById('fps');
  Element total = document.getElementById('total');

  int fps = 0;

  particles.everyFrame = () {
    fps++;
  };

  new Timer.periodic(const Duration(seconds: 1), (_) {
    counter.text = fps.toString();
    total.text = particles.settings['particles']['array'].length.toString();

    if (fps < 30) {
      counter.classes.add('has-text-danger');
    } else {
      counter.classes.clear();
    }

    fps = 0;
  });
}

Element $id(String id) => document.getElementById(id);

getInput(String id) {
  Element el = $id(id);
  if (el is SelectElement) {
    return el;
  } else {
    return el as InputElement;
  }
}

settingsRefresh() {
  particles.config = {
    "particles": {
      "number": {
        "value":  int.parse(getInput('particles-number-value').value),
        "density": {
          "enable": getInput('particles-number-density-enable').checked,
          "value_area": int.parse(getInput('particles-number-density-value_area').value)
        }
      },
      "color": {
        "value": multipleInputs($id('particles-color-value'))
      },
      "shape": {
        "type": multipleInputs($id('particles-shape-type')),
        "stroke": {
          "width":  int.parse(getInput('particles-shape-stroke-width').value),
          "color": getInput('particles-shape-stroke-color').value
        },
        "polygon": {
          "nb_sides":  int.parse(getInput('particles-shape-polygon-nb_sides').value)
        },
        "image": {
          "src": getInput('particles-shape-image-src').value,
          "width":  int.parse(getInput('particles-shape-image-width').value),
          "height":  int.parse(getInput('particles-shape-image-height').value)
        },
        "character": {
          "value": multipleInputs($id('particles-shape-character-value'))
        }
      },
      "opacity": {
        "value":  double.parse(getInput('particles-opacity-value').value),
        "random": getInput('particles-opacity-random').checked,
        "anim": {
          "enable": getInput('particles-opacity-anim-enable').checked,
          "speed":  int.parse(getInput('particles-opacity-anim-speed').value),
          "opacity_min":  double.parse(getInput('particles-opacity-anim-opacity_min').value),
          "sync": getInput('particles-opacity-anim-sync').checked
        }
      },
      "size": {
        "value":  int.parse(getInput('particles-size-value').value),
        "random": getInput('particles-size-random').checked,
        "anim": {
          "enable": getInput('particles-size-anim-enable').checked,
          "speed":  int.parse(getInput('particles-size-anim-speed').value),
          "size_min":  int.parse(getInput('particles-size-anim-size_min').value),
          "sync": getInput('particles-size-anim-sync').checked
        }
      },
      "line_linked": {
        "enable": getInput('particles-line_linked-enable').checked,
        "distance": int.parse(getInput('particles-line_linked-distance').value),
        "color": getInput('particles-line_linked-color').value,
        "opacity": double.parse(getInput('particles-line_linked-opacity').value),
        "width": int.parse(getInput('particles-line_linked-width').value)
      },
      "move": {
        "enable": getInput('particles-move-enable').checked,
        "speed": int.parse(getInput('particles-move-speed').value),
        "direction": getInput('particles-move-direction').value,
        "random": getInput('particles-move-random').checked,
        "straight": getInput('particles-move-straight').checked,
        "out_mode": getInput('particles-move-out_mode').value,
        "parallax": getInput('particles-move-parallax').checked,
        "bounce": getInput('particles-move-bounce').checked,
        "attract": {
          "enable": getInput('particles-move-attract-enable').checked,
          "rotateX": int.parse(getInput('particles-move-attract-rotateX').value),
          "rotateY": int.parse(getInput('particles-move-attract-rotateY').value)
        }
      }
    },
    "interactivity": {
      "detect_on": getInput('interactivity-detect_on').value,
      "events": {
        "onhover": {
          "enable": getInput('interactivity-events-onhover-enable').checked,
          "mode": multipleInputs($id('interactivity-events-onhover-mode'))
        },
        "onclick": {
          "enable": getInput('interactivity-events-onclick-enable').checked,
          "mode": multipleInputs($id('interactivity-events-onclick-mode'))
        },
        "resize": getInput('interactivity-events-resize').checked
      },
      "modes": {
        "grab": {
          "distance": int.parse(getInput('interactivity-modes-grab-distance').value),
          "line_linked": {
            "opacity": double.parse(getInput('interactivity-modes-grab-line_linked-opacity').value)
          },
          'outer_shape': {
            'enable': getInput('interactivity-modes-grab-outer_shape-enable').checked,
            'type': getInput('interactivity-modes-grab-outer_shape-type').value,
            'size': int.parse(getInput('interactivity-modes-grab-outer_shape-size').value),
            'stroke': {
              'width': int.parse(getInput('interactivity-modes-grab-outer_shape-stroke-width').value),
              'color': getInput('interactivity-modes-grab-outer_shape-stroke-color').value
            },
          }
        },
        "bubble": {
          "distance": int.parse(getInput('interactivity-modes-bubble-distance').value),
          "size": int.parse(getInput('interactivity-modes-bubble-size').value),
          "duration": double.parse(getInput('interactivity-modes-bubble-duration').value),
          "opacity": double.parse(getInput('interactivity-modes-bubble-opacity').value),
          "speed": int.parse(getInput('interactivity-modes-bubble-speed').value)
        },
        "repulse": {
          "distance": int.parse(getInput('interactivity-modes-repulse-distance').value),
          "strength": int.parse(getInput('interactivity-modes-repulse-strength').value),
          "duration": double.parse(getInput('interactivity-modes-repulse-duration').value)
        },
        "push": {
          "particles_nb": int.parse(getInput('interactivity-modes-push-particles_nb').value)
        },
        "remove": {
          "particles_nb": int.parse(getInput('interactivity-modes-remove-particles_nb').value)
        }
      }
    },
    "retina_detect": getInput('retina_detect').checked
  };

  particles.particlesRefresh(true);
}

List multipleInputs(Element parent) {
  ElementList<Element> inputs = parent.querySelectorAll('input, select');

  List values = [];

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i] is SelectElement) {
      values.add((inputs[i] as SelectElement).value);
    } else {
      values.add((inputs[i] as InputElement).value);
    }
  }

  return values;

}