var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.NamedBase.extend({
  initializing: function() {
    console.log(yosay('Welcome to the Service Fabric application generator!'));
  },

  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Enter a name for the application type: '
      }, {
        type: 'list',
        name: 'serviceType',
        message: 'Choose the type of your first service',
        choices: ["Reliable Service", "Reliable Actor"]
      },
      {
        type: 'input',
        name: 'serviceName',
        message: 'Enter a name for the service type: '
      }
    ];

    this.prompt(prompts, function(answers) {
      this.appName = answers.appName;
      this.serviceType = answers.serviceType;

      done();
    }.bind(this));
  },

  writing: {
    createApplicationProject: function() {
//      var manifestContent = this.fs.read(this.templatePath('ApplicationManifest.xml'));
//      manifestContent.replace("DefaultAppType", this.appName);
//      this.fs.write(this.destinationPath(this.appName + '/' + this.appName + '/' + 'ApplicationManifest.xml'), manifestContent);

      this.fs.copyTpl(
        this.templatePath('ApplicationManifest.xml'),
        this.destinationPath(this.appName + '/' + this.appName + '/' + 'ApplicationManifest.xml'),
        { apptype: this.appName }
      );

      console.log('creating application type ' + this.appName + ' with one ' + this.serviceType);
    }
  }
});
