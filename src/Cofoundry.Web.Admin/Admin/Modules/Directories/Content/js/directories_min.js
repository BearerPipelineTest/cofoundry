angular.module("cms.directories",["ngRoute","cms.shared"]).constant("_",window._).constant("directories.modulePath","/Admin/Modules/Directories/Js/");
angular.module("cms.directories").config(["$routeProvider","shared.routingUtilities","directories.modulePath",function(r,e,i){e.registerCrudRoutes(r,i,"Directory")}]);
angular.module("cms.directories").factory("directories.directoryService",["$http","_","shared.serviceBase","directories.DirectoryTree",function(r,e,t,n){var c={},u=t+"page-directories";function i(e){return u+"/"+e}function o(e){return i(e)+"/access"}return c.getAll=function(){return r.get(u)},c.getTree=function(){return r.get(u+"/tree").then(function(e){return e&&new n(e)})},c.getById=function(e){return r.get(i(e))},c.getAccessRulesByPageDirectoryId=function(e){return r.get(o(e))},c.add=function(e){return r.post(u,e)},c.update=function(e){return r.patch(i(e.pageDirectoryId),e)},c.remove=function(e){return r.delete(i(e))},c.updateAccessRules=function(e){return r.patch(o(e.pageDirectoryId),e)},c}]);
angular.module("cms.directories").factory("directories.DirectoryTree",["_",function(i){return function(r){var e=this;i.extend(e,r),e.flatten=function(t){var r=[];return function e(r,n){if(r.pageDirectoryId==t)return;n.push(r);i.each(r.childPageDirectories,function(r){e(r,n)})}(e,r),r},e.findNodeById=function(t){return function e(r){var n;if(!r)return;r.forEach(function(r){n=n||(r.pageDirectoryId==t?r:e(r.childPageDirectories))});return n}([e])}}}]);
angular.module("cms.directories").directive("cmsDirectoryGrid",["shared.permissionValidationService","directories.modulePath",function(r,e){return{restrict:"E",templateUrl:e+"UIComponents/DirectoryGrid.html",scope:{pageDirectories:"=cmsDirectories",startDepth:"=cmsStartDepth",redirect:"=cmsRedirect"},replace:!1,controller:function(){var i=this;i.getPathDepthIndicator=function(r){for(var e="",t=(i.startDepth||0)+1;t<r;t++)e+="— ";return e},i.canUpdate=r.canUpdate("COFDIR")},controllerAs:"vm",bindToController:!0}}]);
angular.module("cms.directories").controller("AddDirectoryController",["$location","shared.stringUtilities","shared.LoadState","directories.directoryService",function(o,a,t,e){var n=this;function d(){n.globalLoadState.on(),e.add(n.command).then(l,n.globalLoadState.off)}function i(){n.formLoadState.off()}function r(){n.command.urlPath=a.slugify(n.command.name)}function c(){l()}function l(){o.path("/")}n.command={},n.formLoadState=new t(!0),n.globalLoadState=new t,n.editMode=!1,n.save=d,n.cancel=c,n.onNameChanged=r,n.onDirectoriesLoaded=i}]);
angular.module("cms.directories").controller("DirectoryDetailsController",["$routeParams","$q","$location","_","shared.stringUtilities","shared.LoadState","shared.modalDialogService","shared.permissionValidationService","shared.userAreaService","shared.internalModulePath","directories.directoryService",function(t,o,e,n,i,r,a,c,s,l,d){var u=this,f="COFDIR";function m(){u.editMode=!0,u.mainForm.formStatus.clear()}function y(){L(u.saveLoadState),d.update(u.command).then(function(e){return v().then(u.mainForm.formStatus.success.bind(null,e))}.bind(null,"Changes were saved successfully")).finally(C.bind(null,u.saveLoadState))}function h(){u.editMode=!1,u.command=S(u.pageDirectory),u.mainForm.formStatus.clear()}function g(){var e={title:"Delete Directory",message:"Deleting this directory will delete ALL sub-directories and pages linked to this directory. Are you sure you want to continue?",okButtonTitle:"Yes, delete it",onOk:function(){return L(),d.remove(u.pageDirectory.pageDirectoryId).then(A).catch(C)}};a.confirm(e)}function D(){a.show({templateUrl:l+"UIComponents/EntityAccess/EntityAccessEditor.html",controller:"EntityAccessEditorController",options:{entityDefinitionCode:f,entityIdPrefix:"pageDirectory",entityDefinitionName:"Directory",entityDescription:u.pageDirectory.fullUrlPath,entityAccessLoader:function(){return d.getAccessRulesByPageDirectoryId(u.pageDirectory.pageDirectoryId)},saveAccess:d.updateAccessRules}})}function p(){u.hasChildContent||(u.command.urlPath=i.slugify(u.command.name))}function v(e){var n=t.id;return o.all([d.getTree().then(function(e){var t=e.findNodeById(n),e=e.flatten(n);u.pageDirectory=t,u.parentDirectories=e,u.command=S(t),u.editMode=!1,u.hasChildContent=t.numPages||t.childPageDirectories.length}),s.getAll().then(function(e){u.accessRulesEnabled=1<e.length})]).then(C.bind(null,e))}function S(e){return n.pick(e,"pageDirectoryId","name","urlPath","parentPageDirectoryId")}function A(){e.path("")}function L(e){u.globalLoadState.on(),e&&n.isFunction(e.on)&&e.on()}function C(e){u.globalLoadState.off(),e&&n.isFunction(e.off)&&e.off()}u.edit=m,u.save=y,u.cancel=h,u.deleteDirectory=g,u.viewAccessRules=D,u.onNameChanged=p,u.editMode=!1,u.globalLoadState=new r,u.saveLoadState=new r,u.formLoadState=new r(!0),u.canUpdate=c.canUpdate(f),u.canDelete=c.canDelete(f),v(u.formLoadState)}]);
angular.module("cms.directories").controller("DirectoryListController",["_","shared.modalDialogService","shared.LoadState","shared.SearchQuery","shared.permissionValidationService","directories.directoryService",function(e,r,t,a,i,o){var d=this;d.gridLoadState=new t,d.canCreate=i.canCreate("COFDIR"),d.gridLoadState.on(),o.getTree().then(function(e){e=e.flatten();d.result=e.slice(1,e.length),d.gridLoadState.off()})}]);