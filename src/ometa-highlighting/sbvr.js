define(['codemirror-ometa/highlighter', 'server-glue', './sbvr.css'], function(codeMirrorOmetaHighlighter, {ExtendedSBVRParser}) {
	codeMirrorOmetaHighlighter(ExtendedSBVRParser, 'sbvr', 'text/sbvr', {enableLineByLineParsing: true});
});
