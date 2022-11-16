import { rest } from "msw";

import createMockDeviceUser from "__mocks__/deviceUserMock";
import createMockHost from "__mocks__/hostMock";
import createMockLicense from "__mocks__/licenseMock";
import createMockMacAdmins from "__mocks__/macAdminsMock";
import { baseUrl } from "test/test-utils";

export const defaultDeviceHandler = rest.get(
  baseUrl("/device/:token"),
  (req, res, context) => {
    return res(
      context.json({
        host: createMockHost(),
        license: createMockLicense(),
        org_logo_url: "",
      })
    );
  }
);

export const defaultDeviceMappingHandler = rest.get(
  baseUrl("/device/:token/device_mapping"),
  (req, res, context) => {
    return res(
      context.json({
        device_mapping: [createMockDeviceUser()],
        host_id: 1,
      })
    );
  }
);

export const defaultMacAdminsHandler = rest.get(
  baseUrl("/device/:token/macadmins"),
  (req, res, context) => {
    return res(
      context.json({
        macadmins: createMockMacAdmins(),
      })
    );
  }
);
