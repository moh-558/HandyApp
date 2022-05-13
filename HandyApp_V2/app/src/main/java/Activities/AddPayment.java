/*
 * FILE          : AddPaymentActivity
 * PROGRAMMERs   : The 3 Amigos (Group)
 * LAST VERSION  : 2022-04-05
 * DESCRIPTION   : This file is responsible of handling the add payment
 *                 it checks is the card is valid using Stripe service.
 *
 *
 */
package Activities;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import com.example.handyapp_v2.R;
import com.stripe.android.Stripe;
import com.stripe.android.TokenCallback;
import com.stripe.android.model.Card;
import com.stripe.android.model.Token;
import com.stripe.android.view.CardMultilineWidget;

public class AddPayment extends AppCompatActivity {

    CardMultilineWidget cardMultilineWidget;
    Button save;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_payment);
        ActionBar actionBar = getSupportActionBar();


        cardMultilineWidget = findViewById(R.id.card_input_widget);
        save = findViewById(R.id.save_payment);

        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                saveCard();
            }
        });
    }

    private void saveCard() {

        Card card =  cardMultilineWidget.getCard();
        if(card == null){
            Toast.makeText(getApplicationContext(),"Invalid card",Toast.LENGTH_SHORT).show();
        }else {
            if (!card.validateCard()) {
                // Do not continue token creation.
                Toast.makeText(getApplicationContext(), "Invalid card", Toast.LENGTH_SHORT).show();
            } else {
                CreateToken(card);
            }
        }
    }

    private void CreateToken( Card card) {
        Stripe stripe = new Stripe(getApplicationContext(), getString(R.string.publishablekey));
        stripe.createToken(
                card,
                new TokenCallback() {
                    public void onSuccess(Token token) {

                        // Send token to your server
                        Log.e("Stripe Token", token.getId());
                        Intent intent = new Intent();
                        intent.putExtra("card",token.getCard().getLast4());
                        intent.putExtra("stripe_token",token.getId());
                        intent.putExtra("cardtype",token.getCard().getBrand());
                        setResult(0077,intent);
                        finish();
                    }
                    public void onError(Exception error) {

                        // Show localized error message
                        Toast.makeText(getApplicationContext(),
                                error.getLocalizedMessage(),
                                Toast.LENGTH_LONG
                        ).show();
                    }
                }
        );
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case android.R.id.home:
                finish();
                break;

            default:
                return super.onOptionsItemSelected(item);
        }
        return true;
    }



}