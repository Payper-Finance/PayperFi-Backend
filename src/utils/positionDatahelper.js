const { VMMCONTRACT } = require("../config/serverConfig");
const PRECISION = 1000000000000000000;

const PositionRepository = require("../repository/positionRepository");

const positionAction = async (opHash) => {
  this.positionRepository = new PositionRepository();
  let TransactionId = opHash;
  console.log(TransactionId);

  try {
    let storage = await axios
      .get(
        `https://api.ghostnet.tzkt.io/v1/operations/transactions/${TransactionId}`
      )
      .then((result) => {
        return result.data;
      });
    if (storage.length == 0) {
      return;
    }

    let transaction;
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].target.address == VMMCONTRACT) {
        transaction = storage[i];
        break;
      }
    }

    let action = transaction.parameter.entrypoint;
    let address;
    if (action == "liquidate") {
      address = transaction.parameter.value;

      //get
      const liquidationResult =
        await this.positionRepository.getPositionAddress(address);

      let liquidationcount;
      if (liquidationResult.LiquidationCount == null) {
        liquidationcount = 1;
      } else {
        liquidationcount = parseInt(liquidationResult.LiquidationCount) + 1;
      }

      // update
      let key = { Address: address };
      let data = {
        $set: {
          LiquidationCount: liquidationcount,
        },
      };
      await this.positionRepository.updatePositionAddress(key, data);
    } else {
      address = transaction.sender.address;
    }
    //get
    const result = await this.positionRepository.getPositionAddress(address);

    if (result) {
      if (action == "closePosition" || action == "liquidate") {
        let totalrealize;
        let setcloseposition;
        let isliquidate = false;
        if (action == "liquidate") {
          // get
          setcloseposition = await this.positionRepository.getPositionAddress(
            transaction.parameter.value
          );

          isliquidate = true;
        } else {
          //get
          setcloseposition = await this.positionRepository.getPositionAddress(
            address
          );
        }

        let transferDetails = storage[1].parameter.value.value;

        let positionsdetails = setcloseposition.LivePosition;

        if (Object.keys(positionsdetails).length === 0) {
          return;
        }

        console.log("transferdetails - " + transferDetails / PRECISION);
        console.log("postiiondetails - " + positionsdetails.position_amount);

        let calculatelivepnl = (
          parseFloat(transferDetails / PRECISION) -
          parseFloat(positionsdetails.position_amount)
        ).toFixed(3);

        var date = Date(transaction.timestamp);
        let lastData = {
          time: date.toLocaleString(),
          position: positionsdetails.position,
          entry_price: positionsdetails.entry_price,
          vUSD_amount: positionsdetails.vUSD_amount,
          position_value: positionsdetails.position_value,
          collateral_amount: positionsdetails.collateral_amount,
          realizedpnl: calculatelivepnl,
          liquidate: isliquidate,
        };
        if (result.Totalpnl == undefined) {
          totalrealize = calculatelivepnl;
        } else {
          totalrealize =
            parseFloat(result.Totalpnl) + parseFloat(calculatelivepnl);
        }
        console.log(totalrealize);

        //update
        let CompletePositionData = {
          $push: {
            CompletedPosition: lastData,
          },
        };
        await this.positionRepository.updatePositionAddress(
          { Address: address },
          CompletePositionData
        );

        //update
        let TotalpnlData = {
          $set: {
            Totalpnl: totalrealize,
          },
        };
        await this.positionRepository.updatePositionAddress(
          { Address: address },
          TotalpnlData
        );

        let LivePositionData = {
          $set: {
            LivePosition: {},
          },
        };
        await this.positionRepository.updatePositionAddress(
          { Address: address },
          LivePositionData
        );
      } else {
        console.log("test1");
        let data;

        //get
        let setcloseposition = await this.positionRepository.getPositionAddress(
          address
        );

        let positionsdetailsprev = setcloseposition.LivePosition;

        let positionsdetails = transaction.storage.positions[address];

        var date = Date(transaction.timestamp);

        if (action == "decreasePosition") {
          data = {
            time: date.toLocaleString(),
            position: positionsdetails.position,
            entry_price: (positionsdetails.entry_price / PRECISION).toFixed(2),
            funding_amount: (
              positionsdetails.funding_amount / PRECISION
            ).toFixed(2),
            vUSD_amount: (positionsdetails.vUSD_amount / PRECISION).toFixed(2),
            position_value: (
              positionsdetails.position_value / PRECISION
            ).toFixed(2),
            collateral_amount: (
              positionsdetails.collateral_amount / PRECISION
            ).toFixed(2),
            position_amount: positionsdetailsprev.position_amount,
          };
        } else if (action == "increasePosition") {
          let position_amount;
          if (Object.keys(positionsdetailsprev).length === 0) {
            prevPosition = 0;
          } else {
            prevPosition = positionsdetailsprev.position_amount;
          }
          position_amount =
            transaction.parameter.value.vUSD_amount -
            (transaction.parameter.value.vUSD_amount / 100) * 2;

          data = {
            time: date.toLocaleString(),
            position: positionsdetails.position,
            entry_price: (positionsdetails.entry_price / PRECISION).toFixed(2),
            funding_amount: (
              positionsdetails.funding_amount / PRECISION
            ).toFixed(2),
            vUSD_amount: (positionsdetails.vUSD_amount / PRECISION).toFixed(2),
            position_value: (
              positionsdetails.position_value / PRECISION
            ).toFixed(2),
            collateral_amount: (
              positionsdetails.collateral_amount / PRECISION
            ).toFixed(2),
            position_amount: (
              parseFloat(prevPosition) +
              position_amount / PRECISION
            ).toFixed(2),
          };
        } else {
          let position_amount;
          if (action == "addMargin") {
            position_amount = transaction.parameter.value;
          } else {
            position_amount = -transaction.parameter.value;
          }
          data = {
            time: date.toLocaleString(),
            position: positionsdetails.position,
            entry_price: (positionsdetails.entry_price / PRECISION).toFixed(2),
            funding_amount: (
              positionsdetails.funding_amount / PRECISION
            ).toFixed(2),
            vUSD_amount: (positionsdetails.vUSD_amount / PRECISION).toFixed(2),
            position_value: (
              positionsdetails.position_value / PRECISION
            ).toFixed(2),
            collateral_amount: (
              positionsdetails.collateral_amount / PRECISION
            ).toFixed(2),
            position_amount: (
              parseFloat(positionsdetailsprev.position_amount) +
              position_amount / PRECISION
            ).toFixed(3),
          };
        }
        //update
        let LivePositionData = {
          $set: {
            LivePosition: data,
          },
        };
        await this.positionRepository.updatePositionAddress(
          { Address: address },
          LivePositionData
        );
      }
    } else {
      let positionsdetails = transaction.storage.positions[address];
      let position_amount =
        transaction.parameter.value.vUSD_amount -
        (transaction.parameter.value.vUSD_amount / 100) * 2;
      var date = Date(transaction.timestamp);
      let data = {
        Address: address,
        CompletedPosition: [],
        LivePosition: {
          time: date.toLocaleString(),
          position: positionsdetails.position,
          entry_price: (positionsdetails.entry_price / PRECISION).toFixed(2),
          funding_amount: (positionsdetails.funding_amount / PRECISION).toFixed(
            2
          ),
          vUSD_amount: (positionsdetails.vUSD_amount / PRECISION).toFixed(2),
          position_value: (positionsdetails.position_value / PRECISION).toFixed(
            2
          ),
          collateral_amount: (
            positionsdetails.collateral_amount / PRECISION
          ).toFixed(2),
          position_amount: (position_amount / PRECISION).toFixed(3),
        },
      };

      await this.positionRepository.Create(data);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  positionAction,
};
