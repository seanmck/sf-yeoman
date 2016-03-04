var generators = require('yeoman-generator');
var yosay = require('yosay');
var cheerio = require('cheerio');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('appName', {
      type: String,
      required: true
    });
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
        type: 'list',
        name: 'frameworkType',
        message: 'Choose a framework for your service',
        choices: ["Reliable Service", "Reliable Actor"]
      },
      {
        type: 'input',
        name: 'serviceTypeName',
        message: 'Enter a name for the service type: '
      }
    ];

    this.prompt(prompts, function(answers) {
      this.frameworkType = answers.frameworkType;
      this.serviceTypeName = answers.serviceTypeName;

      done();
    }.bind(this));
  },

  writing: {
    createServiceProject: function() {
      this.fs.copyTpl(
        this.templatePath('ServiceManifest.xml'),
        this.destinationPath(this.options.appName + '/' + this.serviceTypeName + '/PackageRoot/ServiceManifest.xml'),
        {
          serviceTypeName: this.serviceTypeName,
          servicePackageName: this.serviceTypeName + 'Pkg',
          hasPersistedState: 'true'
        } 
      );
    }
  }
});
