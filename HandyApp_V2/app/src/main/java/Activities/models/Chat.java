/*
 * FILE          : Chat class
 * PROGRAMMERs   : The 3 Amigos (Group)
 * LAST VERSION  : 2022-04-05
 * DESCRIPTION   : This file is responsible of handling the chat
 *                 information, when two users chatting with each other
 *                 this class will handle the sender and the receiver.
 *
 */
package Activities.models;

public class Chat {
    private String sender;
    private String receiver;
    private String message;
    private boolean isseen;

    public Chat(String sender, String receiver, String message, boolean isseen) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.isseen = isseen;
    }

    public Chat() {
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isIsseen() {
        return isseen;
    }

    public void setIsseen(boolean isseen) {
        this.isseen = isseen;
    }
}
