﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PaypalServerSdk.Standard;
using PaypalServerSdk.Standard.Authentication;
using PaypalServerSdk.Standard.Controllers;
using PaypalServerSdk.Standard.Http.Response;
using PaypalServerSdk.Standard.Models;
namespace Rust_store_backend.Controllers
{
    [ApiController]
    public class CheckoutController : Controller
    {
        private readonly OrdersController _ordersController;
        private readonly PaymentsController _paymentsController;
        private readonly Dictionary<string, CheckoutPaymentIntent> _paymentIntentMap;
        private Microsoft.Extensions.Configuration.IConfiguration _configuration { get; }
        private string _paypalClientId
        {
            get { return "AfVX46MqyJqRxPEqUOXbMg87KGjmTE5eqYut14KyqbqEfrFYJsTO3vVn5r_2r00Jvkc-Vx18DMARk4oD"; }
        }
        private string _paypalClientSecret
        {
            get { return "EAZS6ZFbmDZa9VX0Annyl_acRRGk52BOZwhMqfVa3yKlkx87biTioetQkTYkGgPbth0PvfqORUPPsnCd"; }
        }

        private readonly ILogger<CheckoutController> _logger;

        public CheckoutController(Microsoft.Extensions.Configuration.IConfiguration configuration, ILogger<CheckoutController> logger)
        {
            _configuration = configuration;
            _logger = logger;
            _paymentIntentMap = new Dictionary<string, CheckoutPaymentIntent>
        {
            { "CAPTURE", CheckoutPaymentIntent.Capture },
            { "AUTHORIZE", CheckoutPaymentIntent.Authorize }
        };


            // Initialize the PayPal SDK client
            PaypalServerSdkClient client = new PaypalServerSdkClient.Builder()
                .Environment(PaypalServerSdk.Standard.Environment.Sandbox)
                .ClientCredentialsAuth(
                    new ClientCredentialsAuthModel.Builder(_paypalClientId, _paypalClientSecret).Build()
                )
                .LoggingConfig(config =>
                    config
                        .LogLevel(LogLevel.Information)
                        .RequestConfig(reqConfig => reqConfig.Body(true))
                        .ResponseConfig(respConfig => respConfig.Headers(true))
                )
                .Build();

            _ordersController = client.OrdersController;
            _paymentsController = client.PaymentsController;
        }


        [HttpPost("api/orders")]
        public async Task<IActionResult> CreateOrder([FromBody] dynamic cart)
        {
            try
            {

                var result = await _CreateOrder(cart);
                return StatusCode((int)result.StatusCode, result.Data);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Failed to create order:", ex);
                return StatusCode(500, new { error = "Failed to create order." });
            }
        }

        private async Task<dynamic> _CreateOrder(dynamic cart)
        {
            var cartArray = cart.GetProperty("cart");
            var cartElement1 = cartArray[0];
            var cartQuantity = cartElement1.GetProperty("quantity").GetString();


            var pricePerItem = 1; // Example unit price
            var totalAmount = pricePerItem * int.Parse(cartQuantity);
            OrdersCreateInput ordersCreateInput = new OrdersCreateInput
            {
                Body = new OrderRequest
                {
                    Intent = _paymentIntentMap["CAPTURE"],
                    PurchaseUnits = new List<PurchaseUnitRequest>
                {
                    new PurchaseUnitRequest
                    {
                        Amount = new AmountWithBreakdown { CurrencyCode = "USD", MValue = totalAmount.ToString(), },
                    },

                },

                },
            };


            ApiResponse<Order> result = await _ordersController.OrdersCreateAsync(ordersCreateInput);
            return result;
        }


        [HttpPost("api/orders/{orderID}/capture")]
        public async Task<IActionResult> CaptureOrder(string orderID)
        {
            try
            {
                var result = await _CaptureOrder(orderID);
                return StatusCode((int)result.StatusCode, result.Data);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine("Failed to capture order:", ex);
                return StatusCode(500, new { error = "Failed to capture order." });
            }
        }


        private async Task<dynamic> _CaptureOrder(string orderID)
        {
            OrdersCaptureInput ordersCaptureInput = new OrdersCaptureInput { Id = orderID, };

            ApiResponse<Order> result = await _ordersController.OrdersCaptureAsync(ordersCaptureInput);

            return result;
        }





    }
}
