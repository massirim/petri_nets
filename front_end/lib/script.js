//petri network
var petrinet = new joint.dia.Graph;

//paper
var paper = new joint.dia.Paper({ el: $('#paper'), width: 1000, height: 330, gridSize: 10, perpendicularLinks: true, model: petrinet });

var pn = joint.shapes.pn;

//create model places
petrinet.addCell([
	new pn.Place({ position: { x: 140, y: 50 }, attrs: { '.label': { text: 'p1' } }, name: 'p1', tokens: 1 }),
	new pn.Place({ position: { x: 140, y: 260 }, attrs: { '.label': { text: 'p2' } }, name: 'p2', tokens: 2 }),
	new pn.Place({ position: { x: 350, y: 160 }, attrs: { '.label': { text: 'p3' } }, name: 'p3', tokens: 12 }),
	new pn.Place({ position: { x: 550, y: 50 }, attrs: { '.label': { text: 'p4' } }, name: 'p4', tokens: 1 }),
	new pn.Place({ position: { x: 560, y: 260 }, attrs: { '.label': { text: 'p5' } }, name: 'p5', tokens: 3 })
	]);

//create model transitions
petrinet.addCell([
	new pn.Transition({ position: { x: 50, y: 160 }, attrs: { '.label': { text: 't1' } }, name: 't1', priority: 1 }),
	new pn.Transition({ position: { x: 270, y: 160 }, attrs: { '.label': { text: 't2' } }, name: 't2', priority: 1 }),
	new pn.Transition({ position: { x: 470, y: 160 }, attrs: { '.label': { text: 't3' } }, name: 't3', priority: 1 }),
	new pn.Transition({ position: { x: 680, y: 160 }, attrs: { '.label': { text: 't4' } }, name: 't4', priority: 1 })
	]);
	
//create model links
petrinet.addCell([
	new pn.Link({ source: { id: transArray()[0].id, selector: '.root' }, target: { id: placeArray()[0].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 1 ,weight: 1 }),
	new pn.Link({ source: { id: placeArray()[0].id, selector: '.root' }, target: { id: transArray()[1].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 0 ,weight: 1 }),
	new pn.Link({ source: { id: transArray()[1].id, selector: '.root' }, target: { id: placeArray()[1].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 1 ,weight: 1 }),
	new pn.Link({ source: { id: placeArray()[1].id, selector: '.root' }, target: { id: transArray()[0].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 0, weight: 1 }),
	new pn.Link({ source: { id: transArray()[1].id, selector: '.root' }, target: { id: placeArray()[2].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 1, weight: 1 }),
	new pn.Link({ source: { id: placeArray()[2].id, selector: '.root' }, target: { id: transArray()[2].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 0, weight: 1 }),
	new pn.Link({ source: { id: transArray()[2].id, selector: '.root' }, target: { id: placeArray()[3].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 1, weight: 1 }),
	new pn.Link({ source: { id: placeArray()[3].id, selector: '.root' }, target: { id: transArray()[3].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 0, weight: 1 }),
	new pn.Link({ source: { id: transArray()[3].id, selector: '.root' }, target: { id: placeArray()[4].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 1, weight: 1 }),
	new pn.Link({ source: { id: placeArray()[4].id, selector: '.root' }, target: { id: transArray()[2].id, selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: 1 } } }], direction: 0, weight: 1 })
	]);

//cursor position
var cursorPos = {};

$('#paper').mousemove(function(e){
	cursorPos = {
		x: e.pageX,
		y: e.pageY
		};
	});

//add place
function addPlace(xPos, yPos, label, tokens) {
	petrinet.addCell([
		new pn.Place({ position: { x: xPos - 32, y: yPos - 32 }, attrs: { '.label': { text: label } }, name: label, tokens: parseInt(tokens) })
		]);
	}

//add transitions
function addTrans(xPos, yPos, label, priority) {
	petrinet.addCell([
		new pn.Transition({ position: { x: xPos - 13, y: yPos - 32 }, attrs: { '.label': { text: label } }, name: label, priority: parseInt(priority) })
		]);
	}
	
//add cell mode
$('#add-place').change(function() {
	$('label[for="add-content"]').html('Tokens');
	});

$('#add-trans').change(function() {
	$('label[for="add-content"]').html('Priority');
	});
	
//validate node
function validateNode() {
	if($('#add-label').val().trim() && getByName($('#add-label').val()) == null && $('#add-content').val().trim() && Number.isInteger(parseInt($('#add-content').val()))) {
		$('#add-info').empty();
		return true;
		}
	else {
		$('#add-info').html('Fill in inputs with correct values to add');
		return false;
		}
	}

$('#paper').dblclick(function() {
	if(validateNode()) {
		if($('#add-place').is(':checked'))
			addPlace(cursorPos.x, cursorPos.y, $('#add-label').val(), $('#add-content').val());
		else
			addTrans(cursorPos.x, cursorPos.y, $('#add-label').val(), $('#add-content').val());
		$('#add-label, #add-content').val('');
		updatePanel();
		}
	else {
		console.log('ERROR: Invalid node data');
		}
	});
	
//get array index
function getIndex(id) {
	var index;
	[placeArray().indexOf(petrinet.getCell(id)), transArray().indexOf(petrinet.getCell(id))].forEach(function(e) {
		if(e != -1)
			index = e;
		});
		return index;
	}
	
//get cell by name
function getByName(name) {
	var cell = null;
	placeArray().concat(transArray()).forEach(function(e) {
		if(e.prop('name') == name)
			cell = e;
		});
	return cell;
	}

//check place
function isPlace(cell) {
	if(cell.prop('type') == 'pn.Place')
		return true;
	return false;
	}
	
//check transition
function isTrans(cell) {
	if(cell.prop('type') == 'pn.Transition')
		return true;
	return false;
	}

//get places array
function placeArray() {
	var array = [];
	petrinet.getElements().forEach(function(e) {
		if(isPlace(e))
			array.push(e);
		});
	return array;
	}

//get transitions array	
function transArray() {
	var array = [];
	petrinet.getElements().forEach(function(e) {
		if(isTrans(e))
			array.push(e);
		});
	return array;
	}
	
//get links array
function linkArray() {
	return petrinet.getLinks();
	}
	
//delete cell
$('#paper').delegate('.pn', 'dblclick', function() {
	petrinet.getCell($(this).attr('model-id')).remove();
	updatePanel();
	});

//link direction
$('#link-direction').click(function() {
		if($(this).data('direction'))
			$(this).removeClass('glyphicon glyphicon-arrow-left').addClass('glyphicon glyphicon-arrow-right');
		else
			$(this).removeClass('glyphicon glyphicon-arrow-right').addClass('glyphicon glyphicon-arrow-left');
		$(this).data('direction',+!$(this).data('direction'));
		});
		
//validate link
function validateLink(cells) {
	var flag = true, array;
	linkArray().forEach(function(e) {
		array = [e.prop('source').id, e.prop('target').id];
		if(!($(cells).not(array).length && $(array).not(cells).length))
			flag = false;
		});
	return flag;
	}

//add link
function addLink(nodes, direction, weight) {
	if(validateLink(nodes)) {
		$('#add-label, #add-content').val('');
		if(direction)
			nodes.reverse();
		petrinet.addCell([
			new pn.Link({ source: { id: nodes[0], selector: '.root' }, target: { id: nodes[1], selector: '.root' }, labels: [{ position: .5, attrs: { text: { text: weight } } }], direction: direction, weight: weight })
			]);
		}
	else {
		console.log('ERROR: Duplicate link');
		}
	}

$('#link').click(function() {
	addLink([$('#link-place').val(), $('#link-trans').val()], $('#link-direction').data('direction'), $('#link-weight').val())
	});

//update panel
function updatePanel() {
	
	$('#link-place, #link-trans').empty();

	placeArray().forEach(function(e) {
		$('#link-place').append($('<option>', {value: e.id, text: e.attr('.label').text}));
		});

	transArray().forEach(function(e) {
		$('#link-trans').append($('<option>', {value: e.id, text: e.attr('.label').text}));
		});
	
	if(!($('#link-place:has(option)').length && $('#link-trans:has(option)').length))
		$('#link').attr('disabled','disabled');
	}
	
//fire transition
function fireTransition(trans, sec) {
	var inbound = petrinet.getConnectedLinks(trans, { inbound: true });
	var outbound = petrinet.getConnectedLinks(trans, { outbound: true });
	
	var placesBefore = _.map(inbound, function (link) { return petrinet.getCell(link.get('source').id); });
	var placesAfter = _.map(outbound, function (link) { return petrinet.getCell(link.get('target').id); });
	
	_.each(placesBefore, function (p) {
		var link = _.find(inbound, function (l) { return l.get('source').id === p.id; });
		paper.findViewByModel(link).sendToken(V('circle', { r: 5, fill: 'red' }).node, sec * 1000);
		});
	
	_.each(placesAfter, function (p) {
		var link = _.find(outbound, function (l) { return l.get('target').id === p.id; });
		paper.findViewByModel(link).sendToken(V('circle', { r: 5, fill: 'red' }).node, sec * 1000);
		});
	}

//serialize graph
function serializeGraph() {

	var places = '"places": [';
	placeArray().forEach(function(e, i) {
		places += '{ "id": '+ i +', "name": "'+ e.attr('.label').text +'", "tokens": '+ e.prop('tokens') +' }, ';
		});
	places = places.slice(0,-2) + ']';

	var transitions = '"transitions": [';
	transArray().forEach(function(oe, oi) {
		var links_in_ids = [], links_out_ids = [];
		linkArray().forEach(function(ie, ii) {
			if(oe.id == ie.prop('source').id || oe.id == ie.prop('target').id)
				if(ie.prop('direction'))
					links_out_ids.push(ii);
				else
					links_in_ids.push(ii);
			});
		transitions += '{ "id": '+ oi +', "name": "'+ oe.attr('.label').text +'", "priority": '+ oe.prop('priority') +', "links_in_ids": '+ JSON.stringify(links_in_ids) +', "links_out_ids": '+ JSON.stringify(links_out_ids) +' }, ';
		});
	transitions = transitions.slice(0,-2) + ']';

	var links = '"links": [';
	linkArray().forEach(function(e, i) {
		links += '{ "id": '+ i +', "place_id": '+ (e.prop('direction') ? getIndex(e.prop('target').id) : getIndex(e.prop('source').id)) +', "direction": '+ e.prop('direction') +', "weight": '+ e.prop('weight') +' }, ';
		});
	links = links.slice(0,-2) + ']';

	return '"data": {'+ links +','+ places +','+ transitions +'}';
	}

//deserialize graph
function deserializeGraph(data) {
	fireTransition(transArray()[data.id], 1);
	data.links_in.concat(data.links_out).forEach(function(e) {
		e = e.place;
		placeArray()[e.id].prop('tokens', e.tokens);
		});
	}
	
//save graph to file	
function saveToFile() {
	saveAs(new Blob([JSON.stringify(petrinet.toJSON())], {type: 'text/plain;charset=utf-8'}), 'graph.txt');
	}
	
//load graph from file	
function loadFromFile() {
	var file = this.files[0];
	var type = /text.*/;
	
	if(file.type.match(type)) {
		var reader = new FileReader();
		reader.onload = function(e) {
			petrinet.fromJSON(JSON.parse(reader.result));
			updatePanel();
			}
		reader.readAsText(file);
		}
	else {
		console.log('ERROR: File not supported');
		}
	}
	
$('#load-graph').change(loadFromFile);

//web socket connection
socket = new WebSocket("ws://localhost:8888/websocket");

//!response handler
socket.onmessage = function(e) {

    // temporary fix - think about better solution
    try {
    var data = JSON.parse(e.data);
    switch(data.type) {
        case 2:
            deserializeGraph(data.data);
        break;
        }
    } catch (err) {}
	console.log(e.data);
	};

//simulation
var simulation;

//send graph
function sendGraph() {
	socket.send('{"type":1,'+ serializeGraph() +'}');
	}

//simulation step
function stepSimulation() {
	socket.send('{"type":2,"data":""}');
	}

$('#simulation-step').click(stepSimulation);

//start simulation
function startSimulation() {
	sendGraph();
	simulation = setInterval(stepSimulation, 2000);
	}

$('#simulation-start').click(startSimulation);
	
//stop simulation
function stopSimulation() {
	clearInterval(simulation);
	}
	
$('#simulation-stop').click(stopSimulation);

//get parameters
function graphParameters() {
	socket.send('{"type":3,"data":""}');
	}

$('#graph-parameters').click(graphParameters);

//application onload
$(function() {
	updatePanel();
	});
	
//-------------TESTS------------------------------


var dane={"data": {"1": [[-1.0, 1.0, 0.0, 0.0], [1.0, -1.0, 0.0, 0.0], [0.0, 2.0, -1.0, -1.0], [0.0, 0.0, 3.0, 0.0], [0.0, 0.0, 0.0, 1.0]], "2": [1, 3, 4], "3": [[0, 0, [1, 0, 1, 0, 0], {}, null], [1, 0, [0, 1, 1, 0, 0], {}, 1], [2, 0, [1, 0, 0, 0, 1], {"4": 1}, 4], [3, 1, [1, 0, 3, 0, 0], {}, 2], [4, 1, [0, 1, 0, 0, 1], {"6": 2}, 4], [5, 3, [0, 1, 3, 0, 0], {}, 1], [6, 3, [1, 0, 2, 0, 1], {"8": 1}, 4], [7, 5, [1, 0, 5, 0, 0], {}, 2], [8, 5, [0, 1, 2, 0, 1], {"11": 2}, 4], [9, 6, [1, 0, 1, 0, 2], {"12": 1}, 4], [10, 7, [0, 1, 5, 0, 0], {}, 1], [11, 7, [1, 0, 4, 0, 1], {}, 4], [12, 8, [0, 1, 1, 0, 2], {}, 4], [13, 9, [1, 0, 0, 0, 3], {}, 4], [14, 10, [1, 0, 7, 0, 0], {}, 2], [15, 10, [0, 1, 4, 0, 1], {}, 4]], "4": [[0, 0, [1, 0, 1, 0, 0], {}, null], [1, 0, [0, 1, 1, 0, 0], {}, 1], [2, 0, [1, 0, 0, 0, 1], {"4": 1}, 4], [3, 1, [1, 0, Infinity, 0, 0], {}, 2], [4, 1, [0, 1, 0, 0, 1], {"6": 2}, 4], [5, 3, [0, 1, Infinity, 0, 0], {"3": 2}, 1], [6, 3, [1, 0, Infinity, 0, Infinity], {"6": 4, "7": 1}, 4], [7, 5, [0, 1, Infinity, 0, Infinity], {"6": 2, "7": 4}, 4]], "5": [1, 1, Infinity, 0, Infinity], "6": false, "7": false, "8": false}, "type": 3};

//dane.data[3].forEach(function(e) { console.log(e);
//console.log(''); });

function test1() {

	$('#overlay').show();
	
	}
	
	var graph2 = new joint.dia.Graph;

var paper2 = new joint.dia.Paper({
    el: $('#window'),
    width: 800,
    height: 600,
    gridSize: 1,
    model: graph2
});

function state(x, y, label) {
    
    var cell = new joint.shapes.fsa.State({
        position: { x: x, y: y },
        size: { width: 60, height: 60 },
        attrs: { text : { text: label }}
    });
    graph2.addCell(cell);
    return cell;
};

function link(source, target, label, vertices) {
    
    var cell = new joint.shapes.fsa.Arrow({
        source: { id: source.id },
        target: { id: target.id },
        labels: [{ position: .5, attrs: { text: { text: label || '', 'font-weight': 'bold' } } }],
        vertices: vertices || []
    });
    graph2.addCell(cell);
    return cell;
}

var start = new joint.shapes.fsa.StartState({ position: { x: 50, y: 530 } });
graph2.addCell(start);

var code  = state(180, 390, 'code');
var slash = state(340, 220, 'slash');
var star  = state(600, 400, 'star');
var line  = state(190, 100, 'line');
var block = state(560, 140, 'block');

link(start, code,  'start');
link(code,  slash, '/');
link(slash, code,  'other');
link(slash, line,  '/');
link(line,  code,  'new\n line');
link(slash, block, '*');
link(block, star,  '*');
link(star,  block, 'other');
link(star,  code,  '/');
link(line,  line,  'other');
link(block, block, 'other');
link(code,  code,  'other');