import { Component, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

// src/paypal.d.ts
declare global {
  interface Window {
    paypal: any;
  }
}
export {};
@Component({
  selector: 'app-paypa-button',
  standalone: true,
  imports: [],
  templateUrl: './paypa-button.component.html',
  styleUrl: './paypa-button.component.scss'
})
export class PaypaButtonComponent {

  @Input() amount: string;
  private paypalScript: HTMLScriptElement;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    console.log("Got amount ", this.amount)
    this.loadPaypalScript();
  }

  ngOnDestroy(): void {
    if (this.paypalScript) {
      this.paypalScript.remove();
    }
  }

  private loadPaypalScript(): void {
    this.paypalScript = document.createElement('script');
    this.paypalScript.src = 'https://www.paypal.com/sdk/js?client-id=AfVX46MqyJqRxPEqUOXbMg87KGjmTE5eqYut14KyqbqEfrFYJsTO3vVn5r_2r00Jvkc-Vx18DMARk4oD';
    this.paypalScript.onload = () => this.renderPaypalButton();
    this.el.nativeElement.appendChild(this.paypalScript);
  }

  private renderPaypalButton(): void {
    if (window.paypal) {
      window.paypal
        .Buttons({
          style: {
            shape: 'rect',
            layout: 'vertical',
            color: 'gold',
            label: 'paypal',
          },
          message: {
            amount: 100,
          },
          createOrder: async (data: any, actions: any) => {
            try {
              console.log("quantityt ", this.amount)
              const response = await fetch('http://localhost:4600/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  cart: [{ id: '1', quantity: this.amount }],
                }),
              });

              const orderData = await response.json();

              if (orderData.id) {
                return orderData.id;
              }

              const errorDetail = orderData?.details?.[0];
              const errorMessage = errorDetail
                ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                : JSON.stringify(orderData);

              throw new Error(errorMessage);
            } catch (error) {
              console.error(error);
            }
          },
          async onApprove(data: any, actions: any) {
            try {
              const response = await fetch(`http://localhost:4600/api/orders/${data.orderID}/capture`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if(!response.ok){
                alert(`Transaction refused`)
              }
              else{
                alert('Purchase complete')
              }
              // console.log("Reading response json")
              // const orderData = await response.json();
              
              // console.log("Got order data");
              // console.log(orderData)
              // const errorDetail = orderData?.details?.[0];

              // if (errorDetail?.issue === 'INSTRUMENT_DECLINED') {
              //   return actions.restart();
              // } else if (errorDetail) {
              //   throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
              // } else if (!orderData.purchase_units) {
              //   throw new Error(JSON.stringify(orderData));
              // } else {
              //   const transaction =
              //     orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
              //     orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];

              //   alert(`Transaction ${transaction.status}: ${transaction.id}`);
              //   console.log('Capture result', orderData);
           // }
            
            } catch (error) {
              console.error(error);
              alert(`Sorry, your transaction could not be processed: ${error}`);
            }
          },
        })
        .render('#paypal-button-container');
    }
  }
}
