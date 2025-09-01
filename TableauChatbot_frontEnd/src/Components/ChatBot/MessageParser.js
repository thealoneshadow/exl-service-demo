class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
    this.originalState = state;
  }

  parse(message) {
    message = message.toLowerCase();
    console.log(this.state);

    if (message === "options" || message === "start" || message === "menu") {
      return this.actionProvider.handleOptions({ withAvatar: true });
    }

    if (message === "help") {
      return this.actionProvider.handleHelp(false, { withAvatar: true });
    }

    // if (this.state.selectedChoice === 1) {
    //   return this.actionProvider.handleFlow1Query(message, this.state, {
    //     withAvatar: true,
    //   });
    // }

    // if (this.state.selectedChoice === 2) {
    //   return this.actionProvider.handleFlow2Query(message, this.state, {
    //     withAvatar: true,
    //   });
    // }

    // if (this.state.selectedChoice === 3) {
    //   return this.actionProvider.handleFlow3Query(message, this.state, {
    //     withAvatar: true,
    //   });
    // }

    // if (this.state.selectedChoice === 4) {
    //   return this.actionProvider.handleFlow4Query(message, this.state, {
    //     withAvatar: true,
    //   });
    // }

    // if (this.state.selectedChoice === 6) {
    //   return this.actionProvider.handleFlow6Query(message, this.state, {
    //     withAvatar: true,
    //   });
    // }

    if (message === "reset") {
      return () => {
        this.state = JSON.parse(JSON.stringify(this.state.originalState));
      };
    }

    return this.actionProvider.handleMedicareQuery(
      message,
      this.state.messages,
      this.state,
      {
        withAvatar: true,
      }
    );
  }
}

export default MessageParser;
