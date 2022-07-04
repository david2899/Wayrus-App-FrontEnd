'reach 0.1';

const Common = {
  showOutcome: Fun([], Null),
};
export const main = Reach.App(() => {
  const Creator = Participant('Creator', {
    ...Common,
    initialDeposit: Fun([], UInt),
    newDeposit: Fun([UInt, UInt], Null),
    withdraw: Fun([], Bool)
  });
  const Depositor = ParticipantClass('Depositor', {
    getDeposit: Fun([], UInt)
  });
  init();

  Creator.only(() => {
    const initialDeposit = declassify(interact.initialDeposit())
  });
  Creator.publish(initialDeposit).pay(1);

  var keepGoing = true;
  invariant(balance() > 0);
  while(keepGoing) {
    commit();

    Depositor.only(() => {
      const deposit = declassify(interact.getDeposit());
    });
    Depositor.publish(deposit).pay(deposit);
    commit();
    Creator.interact.newDeposit(deposit, balance());

    Creator.only(() => {
      const withdraw = declassify(interact.withdraw());
    })
    Creator.publish(withdraw);
    keepGoing = !withdraw;
    continue;
  }

  commit();
  Creator.publish();
  transfer(balance()).to(Creator);
  Creator.interact.showOutcome();
  commit();
});