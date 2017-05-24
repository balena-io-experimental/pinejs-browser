define [
	'./widgets/text'
	'./widgets/textArea'
	'./widgets/foreignKey'
	'./widgets/integer'
	'./widgets/boolean'
	'./widgets/real'
], (text, textArea, foreignKey, integer, boolean, real) ->
	widgets = {}
	widgets['Value'] = text
	widgets['Hashed'] = widgets['Short Text'] = text
	widgets['Text'] = textArea
	widgets['ConceptType'] = foreignKey
	widgets['ForeignKey'] = foreignKey
	widgets['Integer'] = integer
	widgets['Boolean'] = boolean
	widgets['Real'] = real
	widgets['Serial'] = (action, id, value) ->
		if value != ''
			return value
		return '&lt;auto&gt;'
	widgets['JSON'] = widgets['Interval'] = widgets['Date'] = widgets['Date Time'] = widgets['Time'] = ->
		return 'TODO'

	return (widgetType, action, id, value, nullable, onChange, foreignKeys = {}) ->
		if widgets.hasOwnProperty(widgetType)
			onChange = if onChange then ' onChange="' + onChange + '"' else ''
			return widgets[widgetType](action, id, value, nullable, onChange, foreignKeys)
		else
			console.error('Hit default, wtf?', widgetType)
