import * as typeorm from "typeorm";
import * as shiftRepository from "../shiftRepository";
import Shift from "../../entity/shift";

describe("shiftRepository => find", () => {
  it("find => passed", async () => {
    const expectedData = new Shift();
    expectedData.name = "Test Shift";
    expectedData.date = "2020-11-15";
    expectedData.startTime = "00:00:00";
    expectedData.endTime = "04:00:00";

    const getRepositorySpy = jest
      .spyOn(typeorm, "getRepository")
      .mockReturnValue({
        find: jest.fn().mockResolvedValue([expectedData]),
      } as any);

    const result = await shiftRepository.find();

    expect(result).toEqual([expectedData]);
    expect(getRepositorySpy).toHaveBeenNthCalledWith(1, Shift);
    expect(typeorm.getRepository(Shift).find).toHaveBeenCalledTimes(1);
  });
});

describe("shiftRepository => findById", () => {
  it("findById => passed", async () => {
    const id = "0000-0000-000-000";

    const expectedData = new Shift();
    expectedData.id = id;
    expectedData.name = "Test Shift";
    expectedData.date = "2020-11-15";
    expectedData.startTime = "00:00:00";
    expectedData.endTime = "04:00:00";

    const getRepositorySpy = jest
      .spyOn(typeorm, "getRepository")
      .mockReturnValue({
        findOne: jest.fn().mockResolvedValue(expectedData),
      } as any);

    const result = await shiftRepository.findById(id);

    expect(result).toEqual(expectedData);
    expect(getRepositorySpy).toHaveBeenNthCalledWith(1, Shift);
    expect(typeorm.getRepository(Shift).findOne).toHaveBeenNthCalledWith(
      1,
      id,
      undefined
    );
  });
});

describe("shiftRepository => findOne", () => {
  it("findOne => passed", async () => {
    const id = "0000-0000-000-000";

    const expectedData = new Shift();
    expectedData.id = id;
    expectedData.name = "Test Shift";
    expectedData.date = "2020-11-15";
    expectedData.startTime = "00:00:00";
    expectedData.endTime = "04:00:00";

    const getRepositorySpy = jest
      .spyOn(typeorm, "getRepository")
      .mockReturnValue({
        findOne: jest.fn().mockResolvedValue(expectedData),
      } as any);

    const result = await shiftRepository.findOne({
      id: id,
    });

    expect(result).toEqual(expectedData);
    expect(getRepositorySpy).toHaveBeenNthCalledWith(1, Shift);
    expect(typeorm.getRepository(Shift).findOne).toHaveBeenNthCalledWith(
      1,
      { id },
      undefined
    );
  });
});

describe("shiftRepository => create", () => {
  it("create => passed", async () => {
    const payload = new Shift();
    payload.name = "Test Shift";
    payload.date = "2020-11-15";
    payload.startTime = "00:00:00";
    payload.endTime = "04:00:00";

    const expectedResult = {
      id: "0000-0000-0000-0000",
      name: "Test Shift",
      date: "2020-11-15",
      startTime: "00:00:00",
      endTime: "04:00:00",
    };

    const getRepositorySpy = jest
      .spyOn(typeorm, "getRepository")
      .mockReturnValue({
        save: jest.fn().mockResolvedValue(expectedResult),
      } as any);

    const result = await shiftRepository.create(payload);

    expect(result).toEqual(expectedResult);
    expect(getRepositorySpy).toHaveBeenNthCalledWith(1, Shift);
    expect(typeorm.getRepository(Shift).save).toHaveBeenNthCalledWith(
      1,
      payload
    );
  });
});
