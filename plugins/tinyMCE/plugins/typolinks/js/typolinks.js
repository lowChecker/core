/* Contao Open Source CMS, (C) 2005-2012 Leo Feyer, LGPL license */
tinyMCEPopup.requireLangPack();var LinkDialog={preInit:function(){var a;(a=tinyMCEPopup.getParam("external_link_list_url"))&&document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(a)+'"></script>')},init:function(){var a=document.forms[0],b=tinyMCEPopup.editor;document.getElementById("hrefbrowsercontainer").innerHTML=getBrowserHTML("hrefbrowser","href","file","theme_advanced_link"),isVisible("hrefbrowser")&&(document.getElementById("href").style.width="180px"),this.fillFileList("link_list","tinyMCELinkList"),this.fillRelList("rel_list"),this.fillTargetList("target_list"),this.fillClassList("class_list");if(e=b.dom.getParent(b.selection.getNode(),"A"))a.href.value=b.dom.getAttrib(e,"href"),a.linktitle.value=b.dom.getAttrib(e,"title"),a.insert.value=b.getLang("update"),selectByValue(a,"link_list",a.href.value),selectByValue(a,"target_list",b.dom.getAttrib(e,"target")),selectByValue(a,"rel_list",b.dom.getAttrib(e,"rel"),!0),selectByValue(a,"class_list",b.dom.getAttrib(e,"class"),!0);TinyMCE_EditableSelects.init()},update:function(){var a=document.forms[0],b=tinyMCEPopup.editor,c,d;tinyMCEPopup.restoreSelection(),c=b.dom.getParent(b.selection.getNode(),"A");if(!a.href.value&&c){tinyMCEPopup.execCommand("mceBeginUndoLevel"),d=b.selection.getBookmark(),b.dom.remove(c,1),b.selection.moveToBookmark(d),tinyMCEPopup.execCommand("mceEndUndoLevel"),tinyMCEPopup.close();return}tinyMCEPopup.execCommand("mceBeginUndoLevel");if(c==null){b.getDoc().execCommand("unlink",!1,null),tinyMCEPopup.execCommand("CreateLink",!1,"#mce_temp_url#",{skip_undo:1});var e=this;tinymce.each(b.dom.select("a"),function(d){b.dom.getAttrib(d,"href")=="#mce_temp_url#"&&(c=d,b.dom.setAttribs(c,{href:a.href.value,title:a.linktitle.value,target:a.target_list?getSelectValue(a,"target_list"):null,rel:a.rel_list?getSelectValue(a,"rel_list"):null,"class":a.class_list?getSelectValue(a,"class_list"):null}),e.fixIssues(b,c,a))})}else b.dom.setAttribs(c,{href:a.href.value,title:a.linktitle.value,target:a.target_list?getSelectValue(a,"target_list"):null,rel:a.rel_list?getSelectValue(a,"rel_list"):null,"class":a.class_list?getSelectValue(a,"class_list"):null}),this.fixIssues(b,c,a);if(c.childNodes.length!=1||c.firstChild.nodeName!="IMG")b.focus(),b.selection.select(c),b.selection.collapse(0),tinyMCEPopup.storeSelection();tinyMCEPopup.execCommand("mceEndUndoLevel"),tinyMCEPopup.close()},fixIssues:function(a,b,c){c.href.value+"/"==a.settings.document_base_url&&(c.href.value+="/"),c.href.value==a.settings.document_base_url&&b.setAttribute("mce_href",c.href.value)},checkPrefix:function(a){a.value&&Validator.isEmail(a)&&!/^\s*mailto:/i.test(a.value)&&confirm(tinyMCEPopup.getLang("typolinks_dlg.link_is_email"))&&(a.value="mailto:"+a.value),/^\s*www\./i.test(a.value)&&confirm(tinyMCEPopup.getLang("typolinks_dlg.link_is_external"))&&(a.value="http://"+a.value),a.value&&/^#/.test(a.value)&&(a.value="{{env::request}}"+a.value)},fillFileList:function(a,b){var c=tinyMCEPopup.dom,d=c.get(a),e,f;b=window[b],b&&b.length>0?(d.options[d.options.length]=new Option("",""),tinymce.each(b,function(a){d.options[d.options.length]=new Option(a[0],a[1])})):c.remove(c.getParent(a,"tr"))},fillRelList:function(a){var b=tinyMCEPopup.dom,c=b.get(a),d;c.options[c.options.length]=new Option(tinyMCEPopup.getLang("not_set"),""),c.options[c.options.length]=new Option(tinyMCEPopup.getLang("typolinks_dlg.image_rel_single"),"lightbox"),c.options[c.options.length]=new Option(tinyMCEPopup.getLang("typolinks_dlg.image_rel_multi"),"lightbox[multi]")},fillTargetList:function(a){var b=tinyMCEPopup.dom,c=b.get(a),d;c.options[c.options.length]=new Option(tinyMCEPopup.getLang("not_set"),""),c.options[c.options.length]=new Option(tinyMCEPopup.getLang("typolinks_dlg.link_target_blank"),"_blank"),(d=tinyMCEPopup.getParam("theme_advanced_link_targets"))&&tinymce.each(d.split(","),function(a){a=a.split("="),c.options[c.options.length]=new Option(a[0],a[1])})},fillClassList:function(a){var b=tinyMCEPopup.dom,c=b.get(a),d,e;(d=tinyMCEPopup.getParam("theme_advanced_styles"))?(e=[],tinymce.each(d.split(";"),function(a){var b=a.split("=");e.push({title:b[0],"class":b[1]})})):e=tinyMCEPopup.editor.dom.getClasses(),c.options[c.options.length]=new Option(tinyMCEPopup.getLang("not_set"),""),e.length>0&&tinymce.each(e,function(a){c.options[c.options.length]=new Option(a.title||a["class"],a["class"])})}};LinkDialog.preInit(),tinyMCEPopup.onInit.add(LinkDialog.init,LinkDialog);