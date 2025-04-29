<script defer src="https://unpkg.com/@popperjs/core@2"></script>
<script defer src="https://unpkg.com/tippy.js@6"></script>
<script defer src="https://unpkg.com/swiper@8.4.5/swiper-bundle.min.js"></script>
<script type="text/javascript">
  (function() {
    var t = document.createElement('script'),
        s = document.getElementsByTagName('script')[0];
    t.async = true;
    t.id    = 'cio-forms-handler';
    t.setAttribute('data-site-id', '5c3d8e8e3fe0f2dba925');
    t.setAttribute('data-base-url', 'https://customerioforms.com');

    t.src = 'https://customerioforms.com/assets/forms.js';

    s.parentNode.insertBefore(t, s);
  })();
</script>
<!-- Google Tag Manager -->
<script async>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WJR2NXHZ');</script>
<!-- End Google Tag Manager -->

<!-- Hide all elements for SG site only -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  if (!window.location.pathname.startsWith('/sg')) {
    var sgOnlyElements = document.querySelectorAll('[data-locale-sg-only], .sg-only');
    sgOnlyElements.forEach(function(element) {
      element.style.display = 'none';
    });
  }
});
</script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const isSgUrl = window.location.pathname.startsWith('/sg');
    const elements = document.querySelectorAll('[locale-settings]');

    elements.forEach(function(element) {
        const localeSettings = element.getAttribute('locale-settings');
        let shouldHide = false;
        
        switch(localeSettings) {
            case 'us':
                shouldHide = isSgUrl;
                break;
            case 'sg':
                shouldHide = !isSgUrl;
                break;
            case 'both':
                shouldHide = false;
                break;
            default:
                console.warn(`Unexpected locale-settings value: ${localeSettings}`);
                shouldHide = true;
                break;
        }

        element.hidden = shouldHide;
    });
});
</script>

<!--- Intercom Code -->
<script>
  window.intercomSettings = {
    api_base: "https://api-iam.intercom.io",
    app_id: "o93h49pz",
  };
</script>
<script>
  // We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/o93h49pz'
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/o93h49pz';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>

<!---Tooltip-->
<script>
document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the class 'tooltip-wrapper'
  const tooltipWrappers = document.querySelectorAll('.tooltip-wrapper');
  
  tooltipWrappers.forEach(wrapper => {
    const triggerElement = wrapper.querySelector('.tooltip-trigger');
    const contentElement = wrapper.querySelector('.tooltip-content');
    
    if (triggerElement && contentElement) {
      tippy(triggerElement, {
        content: contentElement.innerHTML,
        allowHTML: true,
        interactive: true,
        theme: 'light',
        appendTo: document.body
      });
      
      // Hide the original content element
      contentElement.style.display = 'none';
    }
  });
});
</script>
<script>
  (function() {
    /************************************************
     * 1. Detect or retrieve region from sessionStorage
     ************************************************/
    let region = sessionStorage.getItem('mitoRegion');
    if (!region) {
      region = detectRegionByTimezone();
      sessionStorage.setItem('mitoRegion', region);
    }

    function detectRegionByTimezone() {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      // Simple check: if it contains "Asia" or "Australia," call it "asia"
      if (tz.includes("Asia") || tz.includes("Australia")) {
        return "asia";
      } else {
        return "us";
      }
    }

    /************************************************
     * 2. Path-Aware Redirect
     *    (Preserve sub-path, query, and hash)
     ************************************************/
    const protocol = window.location.protocol;       // e.g., "https:"
    const domain   = window.location.hostname;       // e.g., "mitohealth.com" or staging domain
    let path       = window.location.pathname;       // e.g., "/biomarkers", "/sg/biomarkers"
    const search   = window.location.search;         // e.g., "?foo=bar"
    const hash     = window.location.hash;           // e.g., "#section"

    // For convenience, define a small helper:
    function redirectTo(newPath) {
      // Use replace() so the browser doesn't add a history entry
      window.location.replace(`${protocol}//${domain}${newPath}${search}${hash}`);
    }

    // (A) If region = "asia" but path does NOT start with "/sg", prepend "/sg"
    if (region === "asia" && !path.toLowerCase().startsWith("/sg")) {
      // If path = "/biomarkers", new path = "/sg/biomarkers"
      // If path = "/", new path = "/sg"
      redirectTo("/sg" + path);
      return; // Stop here to prevent further script execution this load
    }

    // (B) If region = "us" but path starts with "/sg", remove "/sg"
    if (region === "us" && path.toLowerCase().startsWith("/sg")) {
      // "/sg/biomarkers" => "/biomarkers"
      const newPath = path.replace(/^\/sg/, "") || "/";
      redirectTo(newPath);
      return;
    }

    /************************************************
     * 3. Manual Locale Switcher via hreflang
     ************************************************/
    // If you have <a hreflang="en-US"> or <a hreflang="en-SG"> links:
    document.addEventListener('DOMContentLoaded', function() {
      const localeLinks = document.querySelectorAll('a[hreflang]');
      localeLinks.forEach(function(link) {
        link.addEventListener('click', function() {
          const locale = link.getAttribute('hreflang');
          // If user picks US
          if (locale === 'en-US') {
            sessionStorage.setItem('mitoRegion', 'us');
          }
          // If user picks SG
          else if (locale === 'en-SG') {
            sessionStorage.setItem('mitoRegion', 'asia');
          }
          // If you have more locales in the future, handle them similarly
        });
      });
    });

  })();
</script>
<!-- UTM Tracking Script -->
<script>
    // Function to store UTM parameters in session storage
    function storeUTMParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {};

        // List of UTM parameters to track
        const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

        utmKeys.forEach((key) => {
            if (urlParams.has(key)) {
                utmParams[key] = urlParams.get(key);
            }
        });

        // Store in session storage
        if (Object.keys(utmParams).length > 0) {
            try {
                sessionStorage.setItem('utmParams', JSON.stringify(utmParams));
            } catch (e) {
                console.warn('Failed to store UTM parameters:', e);
            }
        }
    }

    // Function to append UTM parameters to all internal links
    function appendUTMParametersToLinks() {
        try {
            const storedUTM = sessionStorage.getItem('utmParams');
            if (storedUTM) {
                const utmParams = JSON.parse(storedUTM);
                const utmQueryString = new URLSearchParams(utmParams).toString();

                // Update all internal links with UTM parameters
                document.querySelectorAll('a').forEach((link) => {
                    const url = new URL(link.href, window.location.origin);
                    if (url.hostname === window.location.hostname) {
                        url.search += (url.search ? '&' : '') + utmQueryString;
                        link.href = url.toString();
                    }
                });
            }
        } catch (e) {
            console.warn('Failed to append UTM parameters to links:', e);
        }
    }

    function onReady() {
        console.log('onReady fired. Document and all resources loaded.');

        // UTM parameter persistence
        storeUTMParameters();
        appendUTMParametersToLinks();
    }

    window.addEventListener('load', onReady);
</script>

<!-- Waitlist Button Script -->
<script>
    // Function to update waitlist buttons if 'invite' parameter is present
    function updateWaitlistButtons() {
        console.log('updateWaitlistButtons called.');
        const getUrlParameter = (name) => {
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            const results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
        };

        if (getUrlParameter('invite')) {
            document.querySelectorAll('#waitlist-btn').forEach(button => {
                button.textContent = "Sign Up";
                let newHref = 'http://members.mitohealth.com/get-started';
                const utmParams = new URLSearchParams(window.location.search).toString();
                if (utmParams) newHref += '?' + utmParams;
                button.href = newHref;
            });
        }
    }

    function onWaitlistReady() {
        console.log('onWaitlistReady fired.');

        // Waitlist button updates
        updateWaitlistButtons();
    }

    window.addEventListener('load', onWaitlistReady);
</script>
<script>	
$(document).ready(function() {
	$(".rich-text_blog figure.w-richtext-align-center").each(function(){
		$(this).removeClass("w-richtext-align-center")
       .addClass("w-richtext-align-fullwidth");
	});
});
</script>
<!--- Comparison Table --->
<script>
// Pricing table - mobile & tablet slider
var init = false;
var pricingCardSwiper;

function swiperCard() {
  var screenWidth = window.innerWidth;
  
  if (screenWidth <= 991) { // Apply swiper only for <= 991px
    var slidesPerView = screenWidth <= 767 ? 1 : 2; // 1 slide for ≤767px, 2 slides for 768-991px

    if (!init) {
      init = true;
      pricingCardSwiper = new Swiper("#pricing-card-slider", {
        slidesPerView: slidesPerView,
        spaceBetween: 0,
        grabCursor: true,
        keyboard: true,
        autoHeight: false,
        navigation: {
          nextEl: "#pricing-card-right",
          prevEl: "#pricing-card-left",
        },
        pagination: {
          el: "#pricing-pagination",
          clickable: true,
        },
      });
    } else {
      // If already initialized, update slidesPerView dynamically
      pricingCardSwiper.params.slidesPerView = slidesPerView;
      pricingCardSwiper.update();
    }
  } else if (init) {
    pricingCardSwiper.destroy();
    init = false;
  }
}

swiperCard();
window.addEventListener("resize", swiperCard);
</script>
<!---- end comparison table --->
