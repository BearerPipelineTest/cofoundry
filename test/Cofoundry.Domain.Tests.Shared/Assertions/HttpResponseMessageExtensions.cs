﻿using System.Net.Http;
using System.Threading.Tasks;

namespace Cofoundry.Domain.Tests.Shared.Assertions
{
    public static class HttpResponseMessageExtensions
    {
        public static HttpResponseMessageAssertions Should(this HttpResponseMessage httpResponseMessage)
        {
            return new HttpResponseMessageAssertions(httpResponseMessage);
        }
    }
}
