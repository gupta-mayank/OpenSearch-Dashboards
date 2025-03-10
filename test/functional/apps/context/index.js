/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

export default function ({ getService, getPageObjects, loadTestFile }) {
  const browser = getService('browser');
  const opensearchArchiver = getService('opensearchArchiver');
  const PageObjects = getPageObjects(['common']);
  const opensearchDashboardsServer = getService('opensearchDashboardsServer');

  describe('context app', function () {
    this.tags('ciGroup1');

    before(async function () {
      await browser.setWindowSize(1200, 800);
      await opensearchArchiver.loadIfNeeded('logstash_functional');
      await opensearchArchiver.load('visualize');
      await opensearchDashboardsServer.uiSettings.replace({
        defaultIndex: 'logstash-*',
        'discover:v2': false,
      });
      await PageObjects.common.navigateToApp('discover');
    });

    after(function unloadMakelogs() {
      return opensearchArchiver.unload('logstash_functional');
    });

    loadTestFile(require.resolve('./_context_navigation'));
    loadTestFile(require.resolve('./_discover_navigation'));
    loadTestFile(require.resolve('./_filters'));
    loadTestFile(require.resolve('./_size'));
    loadTestFile(require.resolve('./_date_nanos'));
  });
}
