$(document).ready(function(){

  // MODAL
  var modalText = {
    expensifyapp: {
      title: 'Expensify App',
      tag: 'Advanced React App for Expenses',
      detail: 'This is an Advanced React App used for managing expenses. It uses Redux and incorporates TDD with Jest & Enzyme. It has Authentication and Database solutions using Firebase',
      link: 'https://amanuel-expensify-app.herokuapp.com/'
    },
    indecisionapp: {
      title: 'Indecision App',
      tag: 'A Todo List React App',
      detail: 'This is a basic React application for the things to do list.',
      link: 'https://amanuel-indecision-app.herokuapp.com/'
    },
    reactcalculator: {
      title: 'React Calculator',
      tag: 'React app for basic Calculator',
      detail: 'I developed this app based on an article posted by Coleb Pollman. It incorperates TDD with React, Jest & Enzyme.',
      link: 'https://amanuel-react-calculator.herokuapp.com/'
    },
    playnine: {
      title: 'Play-Nine',
      tag: 'React Game',
      detail: 'Based on the randomly selected number of stars, choose buttons whose sum is equal to number of stars.',
      link: 'https://amanuel-play-nine.herokuapp.com/'
    },
    esl: {
      title: 'ESL',
      tag: 'Basic Eritrean Sign Language',
      detail: 'ESL is an Android app for the Basic Eritrean Sign Language. It is being developed under the slogan “Empowering the Deaf Culture” which aims to narrow the gap between the deaf people and the society. The app is being developed using Android Studio 2.3.',
    },
    carwashdb: {
      title: 'CarwashDB',
      tag: 'Carwash Management System.',
      detail: 'The system computes and properly maintains a database of the inventory, daily sales, tax, expenditures and exports a report daily, monthly and annually. To make the app as user friendly as possible I made the front end in Tigrigna, because most of those who use the system are not familiar with English.',
      link: 'https://github.com/amanuel-hadgu/CarwashDB'
    },
    emergencycall: {
      title: 'emergencycall',
      tag: 'Emergency Call App',
      detail: 'It is a Java ME app for the nations Emergency Call System. In our country there is no centralized emergency system, so emergencies are handled independently by their respective agencies. That is emergencies related to the police department are handled by the police stations, emergencies related to ambulance are handled by hospitals and emergencies related to fire are handled by the fire department. To overcome this shortage of centralized emergency system we come up with this idea of Emergency Call App.'
    },
    tkalmeshetifrutadb: {
      title: 'TkalMeshetiFrutaDB',
      tag: 'Fruit Whole Sales Management System',
      detail: 'TkalMeshetiFrutaDB is a fruit whole sales management system which creates a middle ground between farmers and consumers. The system computes and properly maintains a database of inventory, daily sales, tax, expenditures and exports report daily, monthly and annually. To make the app as user friendly as possible I made the front end in Tigrigna, because most of those who use the system are not familiar with English. ',
      link: 'https://github.com/amanuel-hadgu/TkalMeshetiFrutaDB'
    },
    policetrafficdb: {
      title: 'PolicetrafficDB',
      tag: 'Police Traffic Management System',
      detail: 'PoliceTrafficDB is a vehicle management system for the Police Traffic Department of Eritrea. The system records every details of all the vehicles like plate number, owner details, parts model and details and etc. The system also records if any of the vehicle part or the owner is changed. The system then reports every history of any vehicle with in the nation. To make the app as user friendly as possible I made the front end in Tigrigna, because most of those who use the system are not familiar with English.',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart, 
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)'); 
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)'); 
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });
              
    });
  }
})
