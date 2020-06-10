/**
 * Group option placeholder selector based on #placeholder_select plugin
 *
 * @version 0.1
 * @Author zhengwhizz
 * @license MIT
 *
 * @example
 * editorConfig: {
 *       toolbar: [
 *         ["group_placeholder_select"]
 *       ],
 *       extraPlugins: "richcombo,group_placeholder_select",
 *       group_placeholder_select: {
 *         placeholders: [
 *           { group: "卖房信息【甲方】", options: ["客户名称", "客户身份证"] },
 *           {
 *             group: "买(租)房信息【乙方】",
 *             options: ["客户名称", "客户身份证"]
 *           },
 *           {
 *             group: "房产信息",
 *             options: ["坐落", "房号"]
 *           },
 *           {
 *             group: "公章",
 *             options: ["合同章", "财务章"]
 *           }
 *         ]
 *         // Or you can just like this
 *         // placeholders: ["客户名称", "客户身份证"]
 *         // format: "{{%placeholder%}}"
 *       }
 *     },
 *
 */

/**
 * A plugin to enable placeholder tokens to be inserted into the CKEditor message. Use on its own or with teh placeholder plugin.
 * The default format is compatible with the placeholders syntex
 *
 * @version 0.1
 * @Author Troy Lutton
 * @license MIT
 *
 * This is a pure modification for the placeholders plugin. All credit goes to Stuart Sillitoe for creating the original (stuartsillitoe.co.uk)
 *
 */

CKEDITOR.plugins.add("group_placeholder_select", {
  requires: ["richcombo"],
  init: function(editor) {
    //  array of placeholders to choose from that'll be inserted into the editor
    var placeholders = [];
    var hasGroup = false;

    // init the default config - empty placeholders
    var defaultConfig = {
      format: "[[%placeholder%]]",
      placeholders: [],
    };

    // merge defaults with the passed in items
    var config = CKEDITOR.tools.extend(
      defaultConfig,
      editor.config.group_placeholder_select || {},
      true
    );

    // run through an create the set of items to use
    for (var i = 0; i < config.placeholders.length; i++) {
      if (typeof config.placeholders[i] == "object") {
        hasGroup = true;
        var options = [];
        for (var j = 0; j < config.placeholders[i].options.length; j++) {
          var placeholder = config.format.replace(
            "%placeholder%",
            config.placeholders[i].options[j]
          );
          options.push([
            placeholder,
            config.placeholders[i].options[j],
            config.placeholders[i].options[j],
          ]);
        }
        // config.placeholders[i].options.forEach((option) => {
        //   var placeholder = config.format.replace("%placeholder%", option);
        //   options.push([placeholder, option, option]);
        // });
        placeholders.push({
          group: config.placeholders[i].group,
          options: options,
        });
      } else {
        var placeholder = config.format.replace(
          "%placeholder%",
          config.placeholders[i]
        );
        placeholders.push([
          placeholder,
          config.placeholders[i],
          config.placeholders[i],
        ]);
      }
    }
    // add the menu to the editor
    editor.ui.addRichCombo("group_placeholder_select", {
      label: editor.lang.group_placeholder_select
        ? editor.lang.group_placeholder_select.toolbar
        : "占位符",
      title: editor.lang.group_placeholder_select
        ? editor.lang.group_placeholder_select.toolbar
        : "占位符",
      voiceLabel: editor.lang.group_placeholder_select
        ? editor.lang.group_placeholder_select.toolbar
        : "占位符",
      className: "cke_format",
      multiSelect: false,
      panel: {
        css: []
          .concat(editor.config.contentsCss)
          .concat(CKEDITOR.skin.getPath("editor")),
        voiceLabel: editor.lang.group_placeholder_select
          ? editor.lang.group_placeholder_select.toolbar
          : "占位符",
      },

      init: function() {
        if (hasGroup) {
        } else {
          this.startGroup(
            editor.lang.group_placeholder_select
              ? editor.lang.group_placeholder_select.label
              : "请选择"
          );
        }
        for (var i in placeholders) {
          if (placeholders[i] instanceof Array) {
            this.add(
              placeholders[i][0],
              placeholders[i][1],
              placeholders[i][2]
            );
          } else {
            this.startGroup(placeholders[i].group);
            for (var j in placeholders[i].options) {
              this.add(
                placeholders[i].options[j][0],
                placeholders[i].options[j][1],
                placeholders[i].options[j][2]
              );
            }
            // placeholders[i].options.forEach((option) => {
            //   this.add(option[0], option[1], option[2]);
            // });
          }
        }
      },

      onClick: function(value) {
        editor.focus();
        editor.fire("saveSnapshot");
        editor.insertHtml(value);
        editor.fire("saveSnapshot");
      },
    });
  },
});
