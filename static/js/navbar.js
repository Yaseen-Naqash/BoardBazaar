
// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript start Loading...');
});

// handles messages
document.addEventListener("DOMContentLoaded", function() {
  // Select the messages div
  const messagesDiv = document.getElementById('messages');

  if (messagesDiv) {
    // Set a timeout to start fading after 3 seconds (3000 ms)
    setTimeout(function() {
      // Apply a CSS transition to fade out the messages
      messagesDiv.style.transition = "opacity 1s ease";
      messagesDiv.style.opacity = "0";

      // After the transition, remove the element from the DOM
      setTimeout(function() {
        messagesDiv.remove();
      }, 2000); // Wait for the fade out transition to complete
    }, 3000); // 3 seconds before fade out starts
  }
});


// loading screen
// window.addEventListener('load', () => {
//   const loadingScreen = document.getElementById('loading-screen');
//   const content = document.getElementById('content');

//   const minLoadingTime = 4000;
//   const startTime = new Date().getTime();

//   const tips = [
//       "قبل از معامله حتما از شخص دیگر شناخت کافی پیدا کنید",
//       "بردبازار یک پلتفرم مردمی و اوپن سورس هست",
//       "توایلایت ایمپریوم خیلی بازی خوبیه حتما بازیش کنید",
//       "با خرید یک قهوه سازنده این پلتفرم رو حمایت کنید",
//       "الان که دارم این جمله رو مینویسم تو بیمارستانم دیگه خسته شدم",
//       "یا درست ببر یا درست بباز یا گوه نخور"
//   ];

//   const randomTip = tips[Math.floor(Math.random() * tips.length)];
//   document.getElementById('tip-text').innerText = randomTip;

//   // Function to hide the loading screen
//   const hideLoadingScreen = () => {
//       const currentTime = new Date().getTime();
//       const elapsedTime = currentTime - startTime;
      
//       if (elapsedTime >= minLoadingTime) {
//           loadingScreen.style.display = 'none';
//           content.style.display = 'block';
//       } else {
//           setTimeout(hideLoadingScreen, minLoadingTime - elapsedTime);
//       }
//   };

//   hideLoadingScreen();
// });



// search animation
$(document).ready(function(){
    $("#search").focus(function() {
      $(".search-box").addClass("border-searching");
      $(".search-icon").addClass("si-rotate");
    });
    $("#search").blur(function() {
      $(".search-box").removeClass("border-searching");
      $(".search-icon").removeClass("si-rotate");
    });
    $("#search").keyup(function() {
        if($(this).val().length > 0) {
          $(".go-icon").addClass("go-in");
        }
        else {
          $(".go-icon").removeClass("go-in");
        }
    });
    $(".go-icon").click(function(){
      $(".search-form").submit();
    });
});

// userbox dropdown menu
document.addEventListener('DOMContentLoaded', function() {
  var userBoxes = document.querySelectorAll('.user-box');
  var dropdownMenus = document.querySelectorAll('.dropdown-menu');
  var otherLinks = document.querySelector('.other-links');

  userBoxes.forEach(function(userBox, index) {
      var dropdownMenu = dropdownMenus[index];

      userBox.addEventListener('click', function(event) {
          event.stopPropagation(); // Prevent the event from bubbling up

          // Toggle the display of the dropdown menu
          var isDropdownVisible = dropdownMenu.style.display === 'block';
          dropdownMenu.style.display = isDropdownVisible ? 'none' : 'block';

          // Toggle the display of the other-links element
          if (otherLinks) {
              otherLinks.style.display = isDropdownVisible ? 'flex' : 'none';
          }

          // Change the background color of the user box
          if (!isDropdownVisible) {
              userBox.style.backgroundColor = 'white';
          } else {
              userBox.style.backgroundColor = '';
          }
      });

      // Close the dropdown if the user clicks outside of it
      document.addEventListener('click', function(event) {
          if (!userBox.contains(event.target) && !dropdownMenu.contains(event.target)) {
              dropdownMenu.style.display = 'none';

              // Show the other-links element when clicking outside
              if (otherLinks) {
                  otherLinks.style.display = 'flex';
              }

              // Remove the background color of the user box
              userBox.style.backgroundColor = '';
          }
      });
  });
});

// JavaScript (or jQuery) for sidebar toggle functionality
$(document).ready(function() {
  $('.sidebar-toggle').click(function() {
      $('.sidebar').toggleClass('sidebar-open');
  });
});


// test
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript Loaded');
});