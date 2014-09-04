$(function () {

  //
  // setup
  //

  var scripts = {
    anchor: {
      label: 'A simple component'
    },
    nested: {
      label: 'Nested components'
    },
    todo: {
      label: '`TodoItem` component of React TodoMVC'
    }
  };

  var examples = {};
  var defaultExample = 'anchor';
  var select = '<select id="example" class="form-control">';
  Object.keys(scripts).forEach(function (id) {
    examples[id] = $('#' + id).text();
    select += '<option ';
    if (id === defaultExample) {
      select += ' selected="true" ';
    }
    select += 'value=' + id + '>' + scripts[id].label + '</option>';
  });
  select += '</select>'
  $('#examples').html(select);

  //
  // eval code
  //

  var $code = $('#code');
  var $json = $('#json');
  var $example = $('#example');
  var JSX_PREAMBLE = '/** @jsx React.DOM */\n';
  function evalCode(code) {
    try {
      var js = JSXTransformer.transform(JSX_PREAMBLE + code).code;
      return eval(js);
    } catch (e) {
      return e;
    }
  }

  function run() {
    var code = $code.val();
    var x;
    if (code.indexOf('this.transferPropsTo') !== -1) {
      x = new Error('`this.transferPropsTo` not supported, please try to remove the `transferPropsTo` call');
    } else {
      x = evalCode(code);
    }
    if (x instanceof Error) {
      $json.html('<div class="alert alert-danger">' + x.message + '</div>');
    } else {
      $json.html('<pre>' + JSON.stringify(x, null, 2) + '</pre>');
    }
  }

  $code.val(examples[defaultExample]);
  $('#run').click(run);
  $example.on('change', function () {
    var id = $(this).val();
    $code.val(examples[id]);
    run();
  });
  run();

});